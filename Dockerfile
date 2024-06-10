# Stage 1: Build
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Copy package.json and package-lock.json to the working directory
COPY mediasoup-bins ./mediasoup-bins


# Install the application dependencies
RUN if [ "$(uname -m)" = "aarch64" ]; then \
        echo "Setting MEDIASOUP_WORKER_BIN to /app/mediasoup-bins/arm64/mediasoup-worker"; \
        chmod +x /app/mediasoup-bins/arm64/mediasoup-worker; \
        MEDIASOUP_SKIP_WORKER_PREBUILT_DOWNLOAD='true' MEDIASOUP_WORKER_BIN='/app/mediasoup-bins/arm64/mediasoup-worker' yarn install; \
    else \
        echo "Non-ARM architecture detected" && \
        yarn install; \
    fi

# Copy the rest of the application code to the working directory
COPY . .

# Build the NestJS application
RUN yarn build

# Stage 2: Runtime
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy only the build output from the build stage
COPY mediasoup-bins ./mediasoup-bins
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./

# set variables for mediasoup worker binary
RUN if [ "$(uname -m)" = "aarch64" ]; then \
    export MEDIASOUP_SKIP_WORKER_PREBUILT_DOWNLOAD='true' && \
    export MEDIASOUP_WORKER_BIN='/app/mediasoup-bins/arm64/mediasoup-worker' && \
    chmod +x /app/mediasoup-bins/arm64/mediasoup-worker; \
    echo "Setting MEDIASOUP_WORKER_BIN to /app/mediasoup-bins/arm64/mediasoup-worker"; \
fi

# Expose port 3000 to the outside world
EXPOSE 3000

# Command to run the application 
CMD ["node", "dist/main"]

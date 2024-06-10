# Stage 1: Build
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Copy package.json and package-lock.json to the working directory
COPY mediasoup-bins ./mediasoup-bins

# Copy the detect_arch script
COPY detect_arch.sh .

# Make the detect_arch script executable and Run the detect_arch script
RUN chmod +x detect_arch.sh && ./detect_arch.sh

# Install the application dependencies
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

# Build the NestJS application
RUN yarn build

# Stage 2: Runtime
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only the build output from the build stage
COPY --from=build /app/detect_arch.sh ./detect_arch.sh
COPY --from=build /app/mediasoup-bins ./mediasoup-bins
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./

# Make the detect_arch script executable and Run the detect_arch script
RUN chmod +x detect_arch.sh && ./detect_arch.sh

# Expose port 3000 to the outside world
EXPOSE 3000

# Command to run the application 
CMD ["node", "dist/main"]

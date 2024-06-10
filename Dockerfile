# Stage 1: Build
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Copy the pre-install script
COPY detect_arch.sh .

# Make the pre-install script executable
RUN chmod +x detect_arch.sh

# Run the pre-install script
RUN ./detect_arch.sh

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

# Copy only the build output and node_modules from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./

# Expose port 3000 to the outside world
EXPOSE 3000

# Command to run the application 
CMD ["node", "dist/main"]

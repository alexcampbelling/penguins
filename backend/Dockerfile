# Use Node.js 20 Alpine as the base image for smaller size and faster builds
FROM node:20-alpine AS builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock for efficient caching
COPY package.json yarn.lock ./

# Install dependencies
# todo alex: confirm that frozen lockfile is best practice
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# Start a new stage with a minimal image for the runtime
FROM node:20-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy only necessary files from the builder stage
COPY --from=builder /usr/src/app/build ./build
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY package.json ./

# Expose the port the app runs on (should match the PORT in .env)
EXPOSE 3001

# Start the application
CMD ["yarn", "start"]
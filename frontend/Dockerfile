# Build stage
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock for efficient caching
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN yarn build

# Production stage
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy built assets and necessary files from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

# Expose the port Next.js runs on
EXPOSE 3000

# Start the Next.js application
CMD ["yarn", "start"]
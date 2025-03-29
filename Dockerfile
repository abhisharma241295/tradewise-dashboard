# Stage 1: Build the Next.js app
FROM --platform=linux/amd64 node:20-bullseye-slim AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    make \
    g++ \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/* \
    && update-ca-certificates \
    && npm ci


# Copy the rest of the application code to the working directory
COPY . .

# Build the Next.js application for production
RUN npm run build

# Stage 2: Run the Next.js app in a slim production environment
FROM --platform=linux/amd64 node:20-bullseye-slim

# Set the working directory inside the container
WORKDIR /app

# Copy only the essential files from the build stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Expose the port Next.js will run on
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]

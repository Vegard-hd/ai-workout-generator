# Stage 1: Build the Vite application
FROM oven/bun:1.2.17-alpine

WORKDIR /app

# Copy package.json and the bun lockfile
COPY package.json bun.lock ./

# Install all dependencies
RUN bun install

# Copy the rest of your application's source code

# Run the build script to generate the static assets
RUN bun run build

COPY . .

# Expose the port
EXPOSE 3009

# Command to start the server
CMD ["bun", "server.js"]
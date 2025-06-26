FROM oven/bun:1.2.17-alpine

WORKDIR /app

# Copy package.json and the bun lockfile first
COPY package*.json bun.lockb* ./

# Install dependencies
RUN bun install

# Copy the rest of your application's source code
COPY . .

# Run the build script to generate the static assets
RUN bun run build

# Expose the port
EXPOSE 3009

# Command to start the server
CMD ["bun", "server.js"]
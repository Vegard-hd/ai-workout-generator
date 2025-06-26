# Stage 1: Build the Vite application
FROM oven/bun:1.2.17-alpine as builder

WORKDIR /app

# Copy package.json and the bun lockfile
COPY package.json bun.lock ./

# Install all dependencies
RUN bun install

# Copy the rest of your application's source code
COPY . .

# Run the build script to generate the static assets
RUN bun run build

# Debug: Check if dist was created
RUN ls -la /app
RUN ls -la /app/dist || echo "DIST DIRECTORY NOT FOUND"

# Stage 2: Create the production image
FROM oven/bun:1.2.17-alpine

WORKDIR /app

# Copy the package.json and lockfile
COPY package.json bun.lock ./

# Install only production dependencies
RUN bun install --production

# Copy the server script
COPY server.js .

# Copy the built static assets from the builder stage
COPY --from=builder /app/dist ./dist

# Debug: Verify dist was copied
RUN ls -la /app
RUN ls -la /app/dist || echo "DIST DIRECTORY NOT COPIED"

# Expose the port
EXPOSE 3009

# Command to start the server
CMD ["bun", "server.js"]
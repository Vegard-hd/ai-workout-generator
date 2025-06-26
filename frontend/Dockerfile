# Stage 1: Build the Vite application
# We use a specific version of bun and give this stage a name 'builder'
FROM oven/bun:1.2.17-alpine as builder

# Set the working directory
WORKDIR /app

# Copy package.json and the bun lockfile
# Using the lockfile ensures consistent installs
COPY package.json bun.lock ./

# Install all dependencies, including devDependencies needed for the build
RUN bun install

# Copy the rest of your application's source code
COPY . .

# Run the build script to generate the static assets in the 'dist' folder
RUN bun run build

# ---

# Stage 2: Create the lean production image
# We use a slim alpine image for a smaller final image size
FROM oven/bun:1.2.17-alpine

WORKDIR /app

# Copy the package.json and lockfile again
COPY package.json bun.lock ./

# Install only the production dependencies (e.g., express)
RUN bun install --production

# Copy the server script
COPY server.js .

# Copy the built static assets from the 'builder' stage
COPY --from=builder /app/dist ./dist

# Expose the port that the Express server is running on
EXPOSE 3000

# Command to start the production server using bun
CMD ["bun", "server.js"]
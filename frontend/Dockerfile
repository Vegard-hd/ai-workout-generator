FROM oven/bun:1.2.17-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN bun install

# Copy source files
COPY . .

# Build the application
RUN bun run build

# Expose the preview port (Vite preview typically uses 4173, not 5173)
EXPOSE 5173

# Run the preview server with the correct host binding
CMD ["bun", "run", "preview", "--host", "0.0.0.0"]
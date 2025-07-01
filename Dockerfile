# --- build stage ---
FROM oven/bun:1.2.17-debian AS build

WORKDIR /app

# Copy and install frontend dependencies
COPY frontend/package*.json ./
RUN bun install


# Copy the frontend source
COPY frontend/ ./
RUN bun run build



# --- production stage ---
FROM oven/bun:1.2.17-alpine
WORKDIR /app

# Copy only the built frontend to final image
COPY --from=build /app/dist ./frontend/dist



# Copy backend files and install production deps
COPY backend/package*.json ./
RUN bun install --production

# Copy your backend code
COPY backend/ ./

EXPOSE 3014
CMD ["bun", "run", "bin/www"]
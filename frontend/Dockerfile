FROM oven/bun:1.2.17-alpine

WORKDIR /app

COPY package*.json ./

RUN bun install

RUN bun run build

COPY . .

EXPOSE 5173



CMD ["bun", "run", "preview",]
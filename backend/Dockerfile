FROM oven/bun:1.2.17-alpine

WORKDIR /app

COPY package*.json ./

RUN bun install

COPY . .

EXPOSE 3008

CMD ["bun", "run", "dev"]
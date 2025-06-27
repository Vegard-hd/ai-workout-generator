FROM node:24.3-alpine3.22

WORKDIR /app

# Copy package.json and the bun lockfile first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application's source code
COPY . .

# Run the build script to generate the static assets
RUN npm run build

COPY . . 


# Expose the port
EXPOSE 3009

# Command to start the server
CMD ["node", "server.js"]
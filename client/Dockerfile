# Use a lightweight Node image
FROM node:20-bullseye-slim

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Start the dev server
CMD ["npm", "run", "dev"]

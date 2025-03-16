# Use official Node.js image as base
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy rest of the app code
COPY . .

# Expose port 5000
EXPOSE 5000

# Start the application
CMD ["npm", "start"]

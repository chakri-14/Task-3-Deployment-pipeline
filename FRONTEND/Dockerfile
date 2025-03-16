# Build stage
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Reinstall Vite Plugin (just in case)
RUN npm install @vitejs/plugin-react --save-dev

# Build the React app
RUN npm run build

# Verify if the `dist` folder exists (Fixing the error)
RUN ls -la /app/dist

# Production stage (serving the built app)
FROM nginx:alpine

# Copy built frontend from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]

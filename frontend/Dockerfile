FROM node:18.18.0-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY hotel-reservation/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY hotel-reservation/ .

# Expose port 5173
EXPOSE 5173

# Start the development server
CMD ["npm", "run", "dev"]
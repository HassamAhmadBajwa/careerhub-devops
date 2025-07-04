# Use official Node.js image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose backend port (e.g., 5000)
EXPOSE 5000

# Start backend server
CMD ["npm", "run", "dev"]
# 
# Use a Node.js image as the base
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port Vite runs on (default is 5173)
EXPOSE 5173

# Define the command to run your development server
CMD ["npm", "run", "dev"]
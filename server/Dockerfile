# Use the official Node.js image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the Hardhat network port
EXPOSE 5000

# Start the Hardhat node and deploy the contracts
CMD ["node","index.js"]

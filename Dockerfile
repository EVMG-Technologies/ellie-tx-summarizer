FROM node:22-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose the exact port Traefik expects
ENV PORT=3001
EXPOSE 3001

# Start the server
CMD [ "npm", "start" ]

FROM node:22-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Compile TypeScript to JavaScript in the /dist folder
RUN npx tsc

ENV PORT=3001
EXPOSE 3001

# Run the compiled JS natively without tsx wrapper
CMD [ "node", "dist/index.js" ]

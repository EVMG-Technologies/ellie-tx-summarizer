FROM node:22-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV NITRO_PRESET=node-server
RUN npm run build

FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package.json ./

ENV PORT=3000
EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]

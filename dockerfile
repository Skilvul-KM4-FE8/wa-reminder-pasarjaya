# Stage 1: Builder
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies needed for build (python, make, g++, etc.)
RUN apk add --no-cache python3 make g++

# Copy package files first for better caching
COPY package.json package-lock.json ./
RUN npm install --production=false  # Install all dependencies including devDependencies

# Copy .env file
COPY .env ./

# Copy remaining files and build
COPY . .
RUN npm run build

# Stage 2: Runner
FROM node:18-alpine
WORKDIR /app

ENV NODE_ENV production

# Copy .env file
COPY --from=builder /app/.env ./

# Copy only necessary files from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./

EXPOSE 3000
CMD ["npm", "start"]
# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Fix registry & install dependencies
RUN npm config set registry https://registry.npmjs.org/ && \
    npm install --legacy-peer-deps --no-audit

# Copy all source code
COPY . .

# Prisma generate (tanpa engine karena sudah di-install via dependency)
RUN npx prisma generate --no-engine

# Build Next.js app
RUN npm run build

# Start the app
CMD ["npm", "run", "start"]

# Expose port
EXPOSE 3000

# Healthcheck (optional)
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

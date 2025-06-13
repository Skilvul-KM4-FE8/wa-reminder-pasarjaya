# Stage 1: Builder
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files and Prisma schema first
COPY package.json package-lock.json ./
COPY prisma ./prisma/

# Install dependencies and generate Prisma client
RUN npm install
RUN npx prisma generate

# Copy remaining files and build
COPY . .
RUN npm run build

# Stage 2: Runner
FROM node:18-alpine
WORKDIR /app

ENV NODE_ENV production

# Copy from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/prisma ./prisma

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 3000
CMD ["npm", "start"]
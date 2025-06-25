# Gunakan base image ARM64
FROM node:20-alpine

# Install dependencies penting saja
RUN apk add --no-cache \
    openssl \
    python3 \
    make \
    g++ \
    # Dependencies untuk sharp
    vips-dev

WORKDIR /app

# Install sharp khusus untuk ARM64 pertama kali
RUN npm install --platform=linuxmusl --arch=arm64 sharp

# Copy package files
COPY package.json package-lock.json ./
COPY prisma/schema.prisma ./prisma/

# Install dependencies
RUN npm install

# Generate Prisma client
RUN npx prisma generate

# Copy aplikasi
COPY . .

# Build aplikasi
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
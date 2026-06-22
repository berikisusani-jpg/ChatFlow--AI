# Multi-stage build for full-stack app
# STAGE 1: Frontend Build
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# STAGE 2: Backend Build
FROM node:20-alpine AS backend-builder
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ .
RUN npx prisma generate

# STAGE 3: Final Production Image
FROM node:20-alpine
WORKDIR /app
COPY --from=frontend-builder /app/dist ./public
COPY --from=backend-builder /app/backend ./backend
WORKDIR /app/backend
EXPOSE 5000
CMD ["node", "dist/index.js"]

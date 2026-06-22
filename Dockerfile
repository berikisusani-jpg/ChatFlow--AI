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
RUN npm run build || (mkdir -p dist && npx tsc)

# STAGE 3: Final Production Image
FROM node:20-alpine
WORKDIR /app
COPY --from=frontend-builder /app/dist ./public
COPY --from=backend-builder /app/backend/node_modules ./backend/node_modules
COPY --from=backend-builder /app/backend/dist ./backend/dist
COPY --from=backend-builder /app/backend/package.json ./backend/package.json
COPY --from=backend-builder /app/backend/prisma ./backend/prisma

WORKDIR /app/backend
EXPOSE 5000
CMD ["node", "dist/index.js"]

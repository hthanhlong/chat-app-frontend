# Bước 1: Build Base Image (Common image for both Dev and Prod)
FROM node:22-alpine AS base

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy package.json và package-lock.json
COPY package.json  ./

# Cài đặt dependencies
RUN npm install

# Bước 2: Development Image (Build cho Dev)
FROM base AS development

# Copy toàn bộ source code vào container
COPY . .

# Expose port cho Dev server
EXPOSE 5173

# Chạy lệnh phát triển (Vite React)
CMD ["npm", "run", "dev"]

# Bước 3: Production Image (Build cho Prod)
FROM base AS production

WORKDIR /app

COPY package.json .
RUN npm install
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
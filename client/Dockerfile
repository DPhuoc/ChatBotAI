# Sử dụng Node 18 Alpine để nhẹ và phù hợp
FROM node:18-alpine

# Tạo thư mục làm việc
WORKDIR /app

# Copy package.json và package-lock.json (nếu có) trước để cache tốt hơn
COPY package*.json ./

# Cài đặt các package với legacy-peer-deps để tránh xung đột
RUN npm install --legacy-peer-deps

# Copy toàn bộ mã nguồn sau khi cài đặt
COPY . .
RUN mkdir -p dist
# Build project React/Vite
RUN npm run build

# Expose cổng preview của Vite (4173)
EXPOSE 4173

# Chạy Vite preview để phục vụ ứng dụng tĩnh
CMD ["npm", "run", "preview", "--", "--host"]

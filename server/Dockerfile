FROM python:3.13

# Cài đặt các gói cần thiết
RUN apt-get update && apt-get install -y curl tzdata netbase

# Thiết lập múi giờ
ENV TZ=Asia/Ho_Chi_Minh
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Tải script wait-for-it để chờ dịch vụ DB
RUN curl -o /usr/local/bin/wait-for-it https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh \
    && chmod +x /usr/local/bin/wait-for-it

# Tạo thư mục làm việc
WORKDIR /app

# Copy requirements và cài đặt các thư viện
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy toàn bộ source code
COPY . .

EXPOSE 5000

# Chạy ứng dụng
CMD ["wait-for-it", "database:5432", "--", "python3", "run.py"]

# CelebAI - Nói chuyện với người nổi tiếng bằng AI

## Thành viên: 
- Trần Đình Phước - 23521237
- Nguyễn Huy San - 23521335
- Bùi Hữu Tùng - 23521735
- Nguyễn Hữu Luân - 23520897

| Thành viên         | MSSV     | Công việc                            |
| ------------------ | -------- | ------------------------------------ |
| Trần Đình Phước    | 23521237 |                                      |
| Nguyễn Huy San     | 23521335 |                                      |
| Bùi Hữu Tùng       | 23521735 |                                      |
| Nguyễn Hữu Luân    | 23520897 |                                      |

---

## Mô tả Dự án - CelebAI

**CelebAI** là một ứng dụng trò chuyện độc đáo cho phép người dùng giao tiếp với các người nổi tiếng bằng trí tuệ nhân tạo (AI). Ứng dụng mô phỏng phong cách trò chuyện, kiến thức và tính cách của các celeb, mang đến trải nghiệm tương tác chân thực, thú vị và mang tính giải trí cao.

Hệ thống hỗ trợ:
- Đăng ký/đăng nhập người dùng
- Giao diện trò chuyện thân thiện - Có hỗ trợ Responsive cho điện thoại
- Giao diện quản lý và nâng cấp tài khoản Premium
- Lưu lịch sử hội thoại

Ứng dụng được phát triển trên nền tảng:
- **Frontend**: Reactjs
- **Backend**: Flask + PostgreSQL + JWT
- **AI**: RAG + LLM
- **Triển khai**: Docker + Docker Compose
- **Tên miền chính thức**: [https://celebai.site/](https://celebai.site/)

---

## Video demo

_TBD_

## 🎵 Video TikTok

_TBD_

---

## Giao diện Ứng dụng

### MainPage - Trang chủ
Giao diện chính của ứng dụng với thiết kế đơn giản, trực quan. Tại đây người dùng có thể xem giới thiệu về CelebAI, truy cập đăng nhập hoặc đăng ký nhanh chóng.

[![Screenshot-2025-06-22-214259.png](https://i.postimg.cc/x8sqYgw6/Screenshot-2025-06-22-214259.png)](https://postimg.cc/hQdK18Pm)

---

### Log in - Đăng nhập
Trang đăng nhập tài khoản người dùng với xác thực bằng JWT. Giao diện thân thiện, hỗ trợ kiểm tra lỗi đơn giản.

[![Screenshot-2025-06-22-215559.png](https://i.postimg.cc/h485sNnL/Screenshot-2025-06-22-215559.png)](https://postimg.cc/4ndPNLmy)

---

### Sign in - Đăng ký
Trang tạo tài khoản người dùng mới. Kiểm tra hợp lệ email, password và lưu thông tin lên hệ thống một cách bảo mật.

[![Screenshot-2025-06-22-215635.png](https://i.postimg.cc/PrtFRKfB/Screenshot-2025-06-22-215635.png)](https://postimg.cc/Jt2qyNkq)

---

### Dashboard - Bảng điều khiển
Người dùng có thể xem danh sách celeb, truy cập lịch sử chat, nâng cấp tài khoản. Đây là trung tâm điều hướng cho toàn bộ ứng dụng.

[![Screenshot-2025-06-22-220414.png](https://i.postimg.cc/Gmvbdds4/Screenshot-2025-06-22-220414.png)](https://postimg.cc/w1xCkK2z)

---

### Chatpage - Giao diện trò chuyện
Nơi người dùng tương tác với celeb AI. Mỗi celeb có tính cách, kiến thức và cách phản hồi riêng biệt. Hệ thống lưu lịch sử trò chuyện, hỗ trợ AI nhớ ngữ cảnh với vector memory (Pinecone).

[![Screenshot-2025-06-23-000841.png](https://i.postimg.cc/4dwXhPJV/Screenshot-2025-06-23-000841.png)](https://postimg.cc/G8BWWkTm)

---

### Upgrade to Premium - Nâng cấp tài khoản
Người dùng có thể nâng cấp lên Premium để mở khóa các tính năng nâng cao như:
- Trò chuyện không giới hạn
- Nhắn tin bằng giọng nói

[![Screenshot-2025-06-23-001002.png](https://i.postimg.cc/4dqtdr1Y/Screenshot-2025-06-23-001002.png)](https://postimg.cc/hz8hZZ6n)

[![Screenshot-2025-06-23-105634.png](https://i.postimg.cc/9MrZcWy3/Screenshot-2025-06-23-105634.png)](https://postimg.cc/JDCGqCTK)

[![Screenshot-2025-06-23-105706.png](https://i.postimg.cc/SKZc0X27/Screenshot-2025-06-23-105706.png)](https://postimg.cc/bGtZkwRs)

---

## Installation

### Bước 1

```bash
git clone https://github.com/DPhuoc/ChatBotAI.git
```

### Bước 2

```bash
docker compose up --build -d
```
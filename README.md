# ABC Realtime Chat

Ứng dụng chat realtime fullstack gồm:

- `backend`: Node.js + Express + MongoDB + Socket.IO
- `frontend`: React + TypeScript + Vite + Zustand + Tailwind

## Tính năng chính

- Đăng ký, đăng nhập, làm mới phiên đăng nhập.
- Chat realtime 1-1 và group bằng Socket.IO.
- Trạng thái online/offline theo thời gian thực.
- Đánh dấu đã xem tin nhắn.
- Scroll lịch sử tin nhắn dạng infinite scroll.
- Tài liệu API với Swagger.

## Công nghệ sử dụng

### Backend

- Express 5
- MongoDB + Mongoose
- Socket.IO
- JWT + Cookie
- Cloudinary + Multer (upload ảnh)
- Swagger UI

### Frontend

- React 19 + TypeScript
- Vite 7
- Zustand
- React Hook Form + Zod
- Tailwind CSS 4
- Socket.IO Client

## Cấu trúc thư mục

```text
abc-realtime-chat/
	backend/
		src/
			controllers/
			middlewares/
			models/
			routes/
			socket/
			server.js
	frontend/
		src/
			components/
			pages/
			services/
			stores/
			types/
```

## Yêu cầu môi trường

- Node.js 18+ (khuyến nghị 20+)
- npm 9+
- MongoDB instance

## Cài đặt

### 1. Clone dự án

```bash
git clone <your-repo-url>
cd abc-realtime-chat
```

### 2. Cài dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Cấu hình biến môi trường

### Backend

Tạo file `backend/.env` từ `backend/.env.example`:

```env
PORT=5001
MONGODB_CONNECTIONSTRING=mongodb://localhost:27017/abc-chat
ACCESS_TOKEN_SECRET=your_secret
CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend

Bạn đã có file mẫu:

- `frontend/.env.development.example`
- `frontend/.env.production.example`

Tạo file thật tương ứng:

- `frontend/.env.development`
- `frontend/.env.production`

Ví dụ:

```env
VITE_API_URL=http://localhost:5001/api
VITE_SOCKET_URL=http://localhost:5001
```

## Chạy dự án ở local

Mở 2 terminal riêng:

### Terminal 1: Backend

```bash
cd backend
npm run dev
```

Backend chạy mặc định ở `http://localhost:5001`.

### Terminal 2: Frontend

```bash
cd frontend
npm run dev
```

Frontend chạy mặc định ở `http://localhost:5173`.

## Swagger API Docs

Sau khi backend chạy, mở:

`http://localhost:5001/api-docs`

## Build production

### Frontend

```bash
cd frontend
npm run build
npm run preview
```

### Backend

```bash
cd backend
npm start
```

## Ghi chú bảo mật

- Không commit file `.env` thật lên GitHub.
- Chỉ commit file mẫu `.env*.example` để chia sẻ cấu hình.
- Nếu lỡ lộ secret trước đó, cần rotate/revoke key ngay.

## Trạng thái hiện tại

README này phản ánh codebase hiện tại của dự án `abc-realtime-chat` trong workspace này.

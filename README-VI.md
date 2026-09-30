# Fashion Shop

Website thương mại điện tử full-stack dành cho sản phẩm thời trang, được xây dựng với Node.js, Express.js và MongoDB.

## Tổng quan

**Fashion Shop** là một dự án thương mại điện tử full-stack, cung cấp các trải nghiệm riêng biệt cho khách hàng và quản trị viên.

Dự án được phát triển như một dự án web trước đây nhằm thực hành xây dựng một hệ thống thương mại điện tử hoàn chỉnh, bao gồm xác thực người dùng, quản lý sản phẩm, giỏ hàng, xử lý đơn hàng, mã giảm giá, tải lên và quản lý hình ảnh/video, cùng hệ thống quản lý nội dung.

### Demo

**Demo trực tuyến:** https://fashion-bsqk.onrender.com

> **Lưu ý:** Backend được triển khai trên Render Free Tier. Server có thể mất khoảng 30–50 giây để phản hồi ở lần truy cập đầu tiên sau một khoảng thời gian không hoạt động. Hình ảnh và video cũng có thể tải chậm hơn do giới hạn về hosting và băng thông.

---

## Tính năng

### Khách hàng

* Đăng ký và đăng nhập
* Quên mật khẩu
* Xem danh sách sản phẩm
* Tìm kiếm và lọc sản phẩm theo danh mục
* Xem chi tiết sản phẩm
* Thêm sản phẩm vào giỏ hàng
* Cập nhật số lượng sản phẩm trong giỏ hàng
* Áp dụng mã giảm giá
* Đặt hàng
* Gửi câu hỏi đến cửa hàng

### Quản trị viên

* Hệ thống xác thực riêng cho quản trị viên
* Quản lý sản phẩm

  * Thêm sản phẩm
  * Cập nhật sản phẩm
  * Xóa sản phẩm
  * Tải lên hình ảnh/video sản phẩm
* Quản lý danh mục
* Quản lý đơn hàng
* Quản lý mã giảm giá
* Quản lý nội dung website

  * Banner
  * Hình ảnh
  * Video
  * Bài viết
* Quản lý câu hỏi của khách hàng

---

## Điểm nổi bật về kỹ thuật

Một số nội dung kỹ thuật chính được triển khai trong dự án:

* **Xác thực & Phân quyền**

  * Xác thực người dùng bằng JWT
  * Hash mật khẩu bằng Bcrypt
  * Phân tách quyền truy cập giữa người dùng và quản trị viên

* **RESTful API**

  * Xây dựng Backend API với Express.js
  * Thực hiện các thao tác CRUD cho sản phẩm, danh mục, mã giảm giá và nội dung

* **Quản lý Media**

  * Tải lên hình ảnh và video bằng Multer
  * Tích hợp Cloudinary để lưu trữ media trên nền tảng đám mây

* **Cơ sở dữ liệu**

  * MongoDB kết hợp với Mongoose
  * Thiết lập mối quan hệ giữa người dùng, sản phẩm, danh mục, giỏ hàng, đơn hàng và mã giảm giá

* **Giao diện Responsive**

  * Thiết kế giao diện tương thích với máy tính và thiết bị di động

---

## Công nghệ sử dụng

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js
* JWT
* Bcrypt
* Multer
* CORS
* Dotenv

### Cơ sở dữ liệu & Dịch vụ

* MongoDB
* Mongoose
* Cloudinary

---

## Cấu trúc dự án

```text
Fashion Shop/
├── Backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── ...
│
├── Frontend/
│   ├── css/
│   ├── js/
│   ├── pages/
│   └── ...
│
├── Img_Demo/
└── README.md
```

> Cấu trúc thư mục có thể thay đổi tùy theo phiên bản của dự án.

---

## Các Model trong cơ sở dữ liệu

Ứng dụng sử dụng MongoDB kết hợp với Mongoose.

| Model            | Mô tả                                         |
| ---------------- | --------------------------------------------- |
| `User`           | Tài khoản khách hàng và quản trị viên         |
| `Product`        | Thông tin sản phẩm và tham chiếu đến danh mục |
| `Category`       | Danh mục sản phẩm                             |
| `Cart`           | Giỏ hàng liên kết với người dùng và sản phẩm  |
| `Order`          | Đơn hàng và các sản phẩm đã mua               |
| `Voucher`        | Mã giảm giá                                   |
| `Page / Content` | Banner, video và bài viết của website         |
| `Question`       | Câu hỏi và yêu cầu từ khách hàng              |

---

## Cài đặt

### Yêu cầu

* Node.js 14+
* MongoDB Atlas hoặc MongoDB local
* Tài khoản Cloudinary

### 1. Clone repository

```bash
git clone https://github.com/huynhnhut552004/fashion.git
cd fashion
```

### 2. Cài đặt các package

```bash
npm install
```

### 3. Cấu hình biến môi trường

Tạo file `.env` và cấu hình các biến môi trường cần thiết:

```env
MONGO_URL=mongodb+srv://<username>:<password>@...
JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

PORT=3000
```

### 4. Khởi chạy ứng dụng

```bash
npm start
```

Sau đó truy cập:

```text
http://localhost:3000
```

---

## Tổng quan API

Backend cung cấp các RESTful endpoint phục vụ xác thực, sản phẩm, đơn hàng và các chức năng quản trị.

| Chức năng | Method | Endpoint       | Mô tả                           |
| --------- | :----: | -------------- | ------------------------------- |
| Xác thực  |  POST  | `/Login`       | Xác thực người dùng             |
| Sản phẩm  |   GET  | `/Product`     | Lấy danh sách tất cả sản phẩm   |
| Sản phẩm  |   GET  | `/Product/:id` | Lấy thông tin chi tiết sản phẩm |
| Đơn hàng  |  POST  | `/Order`       | Tạo đơn hàng mới                |
| Quản trị  |  POST  | `/imgProduct`  | Tải lên media sản phẩm          |

Để xem toàn bộ API, vui lòng tham khảo mã nguồn Backend.

---

## Giao diện

### Khách hàng

| Trang chủ | Collection |
| --------- | ---------- |
|           |            |

| Sản phẩm | Chi tiết sản phẩm |
| -------- | ----------------- |
|          |                   |

### Xác thực & Quản trị

| Đăng nhập | Dashboard quản trị |
| --------- | ------------------ |
|           |                    |

| Quản lý sản phẩm | Quản lý mã giảm giá |
| ---------------- | ------------------- |
|                  |                     |

---

## Trạng thái dự án

Đây là một **dự án cũ** được phát triển trong quá trình học tập và thực hành phát triển web.

Dự án được lưu lại như một tài liệu tham khảo cho kinh nghiệm phát triển web full-stack trước đây, bao gồm xây dựng RESTful API, xác thực người dùng, thiết kế cơ sở dữ liệu và tích hợp các dịch vụ bên thứ ba.

---

## Tác giả

**Huỳnh Minh Nhựt**

* Email: [nhut552004@gmail.com](mailto:nhut552004@gmail.com)
* Portfolio: https://portfolio-1f96c.web.app

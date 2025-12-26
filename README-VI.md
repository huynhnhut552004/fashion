# Fashion Shop

## 1. Giới thiệu

**Fashion Shop** là một giải pháp thương mại điện tử trọn gói (Full-stack E-commerce Solution) được thiết kế để tối ưu hóa quy trình kinh doanh thời trang trực tuyến.

Dự án được xây dựng theo kiến trúc **RESTful API** với Backend xử lý logic chặt chẽ và Frontend phân tách riêng biệt cho hai đối tượng:
* **Khách hàng (End-users):** Trải nghiệm mua sắm mượt mà từ việc tìm kiếm sản phẩm, quản lý giỏ hàng đến đặt hàng trực tuyến.
* **Quản trị viên (Admins):** Hệ thống Dashboard mạnh mẽ giúp quản lý sản phẩm, theo dõi đơn hàng và kiểm soát nội dung website.

Dự án tập trung vào việc xử lý các tác vụ Backend phức tạp như **Authentication (JWT)**, **Media Storage (Cloudinary)** và **Database Optimization (MongoDB)**.

**Demo:** [https://fashion-bsqk.onrender.com](https://fashion-bsqk.onrender.com)

> ⚠️ **Lưu ý:** Server được deploy trên **Render Free Tier**. Nếu bạn truy cập lần đầu thấy load chậm (khoảng 30-50s), vui lòng kiên nhẫn đợi một chút để server khởi động lại sau trạng thái ngủ đông (sleeping mode). Video và Hình ảnh có thể tải chậm hơn bình thường do băng thông giới hạn.

## 2. Tính năng chính

### Phân hệ User (Khách hàng)
* **Xác thực tài khoản:** Đăng ký, Đăng nhập, Quên mật khẩu.
* **Mua sắm & Sản phẩm:**
    * Tìm kiếm và Lọc sản phẩm theo danh mục.
    * Xem chi tiết sản phẩm.
    * Thêm vào giỏ hàng, cập nhật số lượng.
    * Áp dụng mã giảm giá (Voucher).
    * Thanh toán (Mô phỏng quy trình).
* **Tương tác:** Gửi câu hỏi, thắc mắc đến cửa hàng.

### Phân hệ Admin (Quản trị viên)
* **Đăng nhập quản trị:** Trang riêng biệt, bảo mật cao.
* **Quản lý sản phẩm:**
    * Thêm, sửa, xoá sản phẩm.
    * **Tích hợp Cloudinary:** Upload ảnh/video trực tiếp lên đám mây.
* **Quản lý nội dung (CMS):** Quản lý banner, hình ảnh, video và bài viết.
* **Quản lý kinh doanh:**
    * Quản lý danh mục sản phẩm.
    * Quản lý trạng thái đơn hàng.
    * Quản lý mã giảm giá (Voucher).
    * Phản hồi câu hỏi khách hàng.

## 3. Công nghệ sử dụng (Tech Stack)

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

### Frontend
* **HTML5 / CSS3 / JavaScript:** Xây dựng giao diện người dùng và xử lý logic phía client.
* **Responsive Design:** Tối ưu hiển thị trên nhiều thiết bị.

### Backend
* **Node.js:** Môi trường thực thi JavaScript server-side.
* **Express.js:** Web framework để xây dựng RESTful API và routing.

### Database & Cloud
* **MongoDB:** Cơ sở dữ liệu NoSQL, sử dụng **Mongoose** (ODM) để tương tác dữ liệu.
* **Cloudinary:** Dịch vụ lưu trữ đám mây cho hình ảnh và video.

### Các thư viện & Tiện ích khác
* **Bảo mật:** JWT (Authorization), Bcrypt (Hash password), CORS.
* **Tiện ích:** Multer (Upload file), Dotenv (Biến môi trường).

## 4. Mô hình CSDL (Schema)
* **Users / Admin:** Lưu thông tin tài khoản, mật khẩu (hash).
* **Product:** Thông tin sản phẩm, liên kết với Category ID.
* **Category:** Danh mục sản phẩm.
* **Cart:** Giỏ hàng (Liên kết User ID, Product ID).
* **Order:** Đơn hàng (Liên kết User, Product, Voucher).
* **Voucher:** Mã giảm giá.
* **Page / Content:** Nội dung website (Banner, Video, Bài viết).
* **Question:** Câu hỏi từ khách hàng.

## 5. Cài đặt và Chạy dự án (Installation)

Làm theo các bước dưới đây để chạy dự án trên máy local.

### 1. Yêu cầu tiên quyết
* [Node.js](https://nodejs.org/) (v14 trở lên)
* [MongoDB](https://www.mongodb.com/) (Atlas hoặc Local)
* Tài khoản [Cloudinary](https://cloudinary.com/)

### 2. Cài đặt

**Bước 1: Clone dự án**
* git clone [https://github.com/huynhnhut552004/fashion.git](https://github.com/huynhnhut552004/fashion.git)
cd fashion

**Bước 2: Cài đặt thư viện**
* npm install

**Bước 3: Cấu hình biến môi trường**
* Tạo file .env tại thư mục gốc và điền thông tin của bạn:
    * MONGO_URL=mongodb+srv://<username>:<password>@...
    * JWT_SECRET=your_secret_key
    * CLOUDINARY_CLOUD_NAME=your_name
    * CLOUDINARY_API_KEY=your_key
    ** CLOUDINARY_API_SECRET=your_secret
    * PORT=3000

**Bước 4: Chạy dự án**
* npm start
* Truy cập: http://localhost:3000.
## 6. API Document
Dưới đây là một số Endpoint chính của hệ thống. Tài liệu chi tiết vui lòng xem trong mã nguồn hoặc Postman Collection.

| Chức năng | Method | Endpoint | Mô tả |
| :--- | :---: | :--- | :--- |
| **Auth** | POST | `/Login` | Đăng nhập người dùng (Trả về Token) |
| **Product** | GET | `/Product` | Lấy danh sách toàn bộ sản phẩm |
| **Product** | GET | `/Product/:id` | Xem chi tiết một sản phẩm |
| **Order** | POST | `/Order` | Tạo đơn hàng mới (Checkout) |
| **Admin** | POST | `/imgProduct` | Upload ảnh sản phẩm lên Cloudinary |

## 7. Giao diện Demo (Screenshots)

| Trang chủ (Home) | Trang Collection (Collection) |
|:---:|:---:|
| <img src="Img_Demo/image.png" width="100%"> | <img src="Img_Demo/image-1.png" width="100%"> |

| Sản phẩm (Product) | Chi tiết sản phẩm (Detail) |
|:---:|:---:|
| <img src="Img_Demo/image-2.png" width="100%"> | <img src="Img_Demo/image-3.png" width="100%"> |

| Đăng nhập (Login) | Trang Admin (Admin Main) |
|:---:|:---:|
| <img src="Img_Demo/image-4.png" width="100%"> | <img src="Img_Demo/image-5.png" width="100%"> |

| Quản lý sản phẩm (Product admin) | Quản lý voucher (Voucher admin) |
|:---:|:---:|
| <img src="Img_Demo/image-6.png" width="100%"> | <img src="Img_Demo/image-7.png" width="100%"> |

## 8. Tác giả & Liên hệ
* Huỳnh Minh Nhựt
* Email: nhut552004@gmail.com
* Portfolio: https://portfolio-1f96c.web.app
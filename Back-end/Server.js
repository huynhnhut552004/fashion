const multer = require('multer');
const path = require('path');
const express = require("express");
const cors = require('cors');
const fs = require("fs");
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const mime = require("mime");
const ConnectDB = require("./Config/db");
const authadminRoute = require("./Route/authadminRoute");
const authuserRoute = require("./Route/authuserRoute");
const categoryRoute = require("./Route/categoryRoute");
const contentRoute = require("./Route/contentRoute");
const cartRoute = require("./Route/cartRoute");
const orderRoute = require("./Route/orderRoute");
const productRoute = require("./Route/productRoute");
const pageRoute = require("./Route/pageRoute");
const userRoute = require("./Route/userRoute");
const voucherRoute = require("./Route/voucherRoute");
const forgetRoute = require("./Route/forgetRoute");
const questionRoute = require("./Route/questionRoute");
const { authMiddleware, requireAdmin } = require("./Middleware/authMiddleware");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
ConnectDB();

app.use(express.static(path.join(__dirname, '..')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../User-Index/Main/Main.html'));
});

app.use("/Page", pageRoute);
app.use("/Login-Admin", authadminRoute);
app.use("/Login", authuserRoute);
app.use("/Category", categoryRoute);
app.use("/Content", contentRoute);
app.use("/Order", orderRoute);
app.use("/Cart", cartRoute);
app.use("/Product", productRoute);
app.use("/User", userRoute);
app.use("/Voucher", voucherRoute);
app.use("/Forget", forgetRoute);
app.use("/Question", questionRoute);

app.get("/admin", authMiddleware, requireAdmin, (req, res) => {
    res.json({ secret: "Dữ liệu chỉ dành cho admin!" });
});
app.get("/usertoken", authMiddleware, (req, res) => {
    res.json({ user: req.user });
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    let folder = '';
    let resource_type = 'image';

    if (file.mimetype.startsWith('image')) {
      if (req.originalUrl === '/imgProduct') {
        folder = 'Products';
      } else if (req.originalUrl === '/imgPage') {
        folder = 'Pages';
      }
      resource_type = 'image';
    } else if (file.mimetype.startsWith('video')) {
      folder = 'Videos';
      resource_type = 'video';
    }

    return {
      folder: folder,
      resource_type: resource_type
    };
  }
});

const uploadMiddleware = multer({ storage: storage });

app.post('/imgProduct', uploadMiddleware.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.json({ publicId: req.file.filename, imageUrl: req.file.path });
});

app.post('/imgPage', uploadMiddleware.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.json({ publicId: req.file.filename, imageUrl: req.file.path });
});

app.post('/videoPage', uploadMiddleware.single('video'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No video uploaded.');
    }
    res.json({ publicId: req.file.filename, videoUrl: req.file.path });
});

app.delete('/deleteImage/:publicId', (req, res) => {
    const publicId = req.params.publicId;

    cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
            console.error("Failed to delete image:", error);
            return res.status(500).send("Failed to delete image.");
        }
        res.send("Image deleted successfully.");
    });
});

app.delete('/deleteVideo/:publicId', (req, res) => {
    const publicId = req.params.publicId;

    cloudinary.uploader.destroy(publicId, { resource_type: 'video' }, (error, result) => {
        if (error) {
            console.error("Failed to delete video:", error);
            return res.status(500).send("Failed to delete video.");
        }
        res.send("Video deleted successfully.");
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server đang chạy tại http://localhost:${PORT}`));
const multer = require('multer');
const path = require('path');
const express= require("express");
const cors = require('cors');
const fs = require("fs");
const mime = require("mime");
const ConnectDB= require("./Config/db");
const authadminRoute= require("./Route/authadminRoute");
const authuserRoute= require("./Route/authuserRoute");
const categoryRoute= require("./Route/categoryRoute");
const contentRoute= require("./Route/contentRoute");
const cartRoute= require("./Route/cartRoute");
const orderRoute= require("./Route/orderRoute");
const productRoute= require("./Route/productRoute");
const pageRoute= require("./Route/pageRoute");
const userRoute= require("./Route/userRoute");
const voucherRoute= require("./Route/voucherRoute"); 
const forgetRoute= require("./Route/forgetRoute");
const questionRoute= require("./Route/questionRoute");
const {authMiddleware, requireAdmin}= require("./Middleware/authMiddleware");
require("dotenv").config();
const app= express();
app.use(cors());
app.use(express.json());
ConnectDB();
app.use(express.static(path.join(__dirname, '../User-Index')));
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
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../User-Index/Main/Main.html'));
});
app.get("/admin",authMiddleware,requireAdmin,(req,res)=>{
    res.json({secret:"Dữ liệu chỉ dành cho admin!"});
});
app.get("/usertoken", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});


const storageProduct = multer.diskStorage({
    destination: function (req, file, cb) {
         cb(null, path.join(__dirname, 'Img'));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const imgProduct = multer({ storage: storageProduct });
app.post('/imgProduct', imgProduct.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
   res.json({ imageUrl: `https://fashion-imn4.onrender.com/Img/${req.file.filename}` });
});
app.delete('/deleteProductImage/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'Img', req.params.filename);
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error("Failed to delete image:", err);
            return res.status(500).send("Failed to delete image.");
        }
        res.send("Image deleted.");
    });
});
app.use('/Img', express.static(path.join(__dirname, 'Img')));

const storagePage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../User-Index/Img'));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const imgPage = multer({ storage: storagePage });
app.post('/imgPage', imgPage.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
   res.json({ imageUrl: `https://fashion-imn4.onrender.com/User-Index/Img/${req.file.filename}` });
});
app.delete('/deletePageImage/:filename', (req, res) => {
    const filePath = path.join(__dirname, '../User-Index/Img', req.params.filename);
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error("Failed to delete image:", err);
            return res.status(500).send("Failed to delete image.");
        }
        res.send("Image deleted.");
    });
});
app.use('/User-Index/Img', express.static(path.join(__dirname, '../User-Index/Img')));
 
const storageVideo = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../User-Index/Video'));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilterVideo = (req, file, cb) => {
    const allowedTypes = ['video/mp4', 'video/mkv', 'video/avi', 'video/mov'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only video files are allowed!'), false);
    }
};

const uploadVideo = multer({ storage: storageVideo, fileFilter: fileFilterVideo });
app.get('/Video/:filename', (req, res) => {
    const filePath = path.join(__dirname, '../User-Index/Video', req.params.filename);
    if (!fs.existsSync(filePath)) {
        return res.status(404).send('File not found');
    }
    const mimeType = mime.getType(filePath);
    res.setHeader('Content-Type', mimeType);
    fs.createReadStream(filePath).pipe(res);
});
app.post('/videoPage', uploadVideo.single('video'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No video uploaded.');
    }
    res.json({ videoUrl: `https://fashion-imn4.onrender.com/User-Index/Video/${req.file.filename}` });
});
app.delete('/deletePageVideo/:filename', (req, res) => {
    const filePath = path.join(__dirname, '../User-Index/Video', req.params.filename);
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error("Failed to delete video:", err);
            return res.status(500).send("Failed to delete video.");
        }
        res.send("Video deleted.");
    });
});
app.use('/User-Index/Video', express.static(path.join(__dirname, '../User-Index/Video')));
const PORT= process.env.PORT||3000;
app.listen(PORT, ()=>console.log(`Server đang chạy tại http://localhost:${PORT}`));

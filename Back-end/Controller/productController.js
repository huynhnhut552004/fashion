const Product = require("../Models/Product");
const cloudinary = require('cloudinary').v2; 

exports.getproductmen = async (req, res) => {
    try {
        const product = await Product.find({ gender: "Men" });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: "Lỗi Server!" });
    }
};

exports.getproductwomen = async (req, res) => {
    try {
        const product = await Product.find({ gender: "Women" });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: "Lỗi Server!" });
    }
};

exports.getProductbyId = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm!" });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: "Lỗi Server!" });
    }
};

exports.searchProducts = async (req, res) => {
    const search = req.query.search || "";
    try {
        const result = await Product.find({
            name: { $regex: search, $options: "i" }
        });
        res.json(result);
    } catch (err) {
        console.error("Lỗi searchProducts:", err);
        res.status(500).json({ message: "Lỗi khi tìm kiếm sản phẩm!" });
    }
};

exports.searchProductMen = async (req, res) => {
    const search = req.query.search || "";
    try {
        const result = await Product.find({
            name: { $regex: search, $options: "i" },
            gender: "Men"
        });
        res.json(result);
    } catch (err) {
        console.error("Lỗi searchProducts:", err);
        res.status(500).json({ message: "Lỗi khi tìm kiếm sản phẩm!" });
    }
};

exports.searchProductWomen = async (req, res) => {
    const search = req.query.search || "";
    try {
        const result = await Product.find({
            name: { $regex: search, $options: "i" },
            gender: "Women"
        });
        res.json(result);
    } catch (err) {
        console.error("Lỗi searchProducts:", err);
        res.status(500).json({ message: "Lỗi khi tìm kiếm sản phẩm!" });
    }
};

exports.getByCategory = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const products = await Product.find({ category: categoryId }).populate("category");
        res.json(products);
    } catch (err) {
        console.error("Lỗi getByCategory:", err);
        res.status(500).json({ message: "Lỗi khi lấy sản phẩm theo danh mục!" });
    }
};

exports.getByCategorygender = async (req, res) => {
    const { categoryId, gender } = req.params;
    try {
        const products = await Product.find({ category: categoryId, gender: gender }).populate("category");
        res.json(products);
    } catch (err) {
        console.error("Lỗi getByCategory:", err);
        res.status(500).json({ message: "Lỗi khi lấy sản phẩm theo danh mục!" });
    }
};

exports.get = async (req, res) => {
    try {
        const product = await Product.find();
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: "Lỗi Server!" });
    }
};

exports.post = async (req, res) => {
    const { name, price, description, category, gender, image } = req.body;
    
    if (!name || !price || !description || !category || !gender || !image || !image.publicId || !image.imageUrl) {
        return res.status(400).json({ message: "Thiếu thông tin!" });
    }
    
    try {
        const newProduct = new Product({
            name,
            price,
            description,
            category,
            gender,
            image: {
                publicId: image.publicId,
                imageUrl: image.imageUrl
            }
        });
        await newProduct.save();
        res.json({ message: "Thêm thành công!", product: newProduct });
    } catch (err) {
        console.error("Lỗi khi thêm sản phẩm:", err);
        res.status(500).json({ message: "Lỗi Server!" });
    }
};

exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findById(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm!" });
        }

        if (deletedProduct.image && deletedProduct.image.publicId) {
            await cloudinary.uploader.destroy(deletedProduct.image.publicId);
        }
        await Product.findByIdAndDelete(id);

        res.json({ message: "Đã xóa thành công sản phẩm và ảnh!" });
    } catch (err) {
        console.error("Lỗi khi xóa sản phẩm:", err);
        res.status(500).json({ message: "Lỗi Server!" });
    }
};

exports.patch = async (req, res) => {
    const { id } = req.params;
    const { image, ...updateData } = req.body; 
    
    try {
        const oldProduct = await Product.findById(id);
        if (!oldProduct) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm!" });
        }

        if (image && image.publicId && image.imageUrl) {
            if (oldProduct.image && oldProduct.image.publicId) {
                await cloudinary.uploader.destroy(oldProduct.image.publicId);
            }
            updateData.image = {
                publicId: image.publicId,
                imageUrl: image.imageUrl
            };
        }
        
        const patched = await Product.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true } 
        );
        
        res.json({ message: "Đã sửa!", product: patched });
    } catch (err) {
        console.error("Lỗi khi cập nhật sản phẩm:", err);
        res.status(500).json({ message: "Lỗi server!" });
    }
};

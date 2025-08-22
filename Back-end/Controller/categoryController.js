const Category= require("../Models/Category");
const Product= require("../Models/Product");

exports.getproduct= async (req, res)=>{ 
    try {
        const { categoryId } = req.params;
        const products = await Product.find({ category: categoryId }).populate("category");

        if (products.length === 0) {
            return res.status(404).json({ message: "Không có sản phẩm nào trong danh mục!" });
        }

        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products by category:", error);
        res.status(500).json({ message: "lỗi server!" });
    }
}

exports.get= async(req, res)=>{
    const category= await Category.find();
    res.json(category);
}

exports.post= async(req, res)=>{
    const {name}= req.body;
    try{
        const newCategory= new Category({name});
        await newCategory.save();
        res.json({message:"thêm thành công!", category: newCategory});
    }catch(err){
        res.status(500).json({message:"Lỗi Server!"});
    }
};

exports.patch= async(req, res)=>{
    const {id}= req.params;
    try{
        const patched= await Category.findByIdAndUpdate(
            id,
            req.body,
            {new: true}
        );
        if(!patched) return res.status(404).json({message:"Không tìm thấy danh mục!"});
        res.json({message:"Đã sửa!", category: patched});
    }catch (err){
        res.status(500).json({message:"Lỗi server!"});
    }
};

exports.delete= async(req, res)=>{
    const {id}= req.params;
    try{
        const deleted= await Category.findByIdAndDelete(id);
        if(!deleted) return res.status(404).json({message:"Không tìm thấy danh mục!"});
    }catch (err){
        res.status(500).json({message:"Lỗi Server!"});
    }
};

const Product = require("../Models/Product");

exports.getproductmen= async(req, res)=>{
    const product= await Product.find({gender: "Men"});
    res.json(product);
}

exports.getproductwomen= async(req, res)=>{
    const product= await Product.find({gender: "Women"});
    res.json(product);
}

exports.getProductbyId= async(req, res)=>{
    const {id}= req.params;
    const product= await Product.findById(id) ;
    if(!product){ return res.status(404).json({message:"Không tìm thấy sản phẩm!"})};
    res.json(product);
}

exports.searchProducts= async(req, res)=>{ 
    const search= req.query.search||"";
    try{
        const result= await Product.find({ 
            name:{$regex: search, $options:"i"}
        });
        res.json(result);
    }catch (err){
        console.error("Lỗi searchProducts:", err); 
        res.status(500).json({message:"Lỗi khi tìm kiếm sản phẩm!"})
    }
};

exports.searchProductMen= async(req, res)=>{  
    const search= req.query.search||"";
    const gender= req.params;
    try{
        const result= await Product.find({ 
            name:{$regex: search, $options:"i"},
            gender: "Men"
        });
        res.json(result);
    }catch (err){
        console.error("Lỗi searchProducts:", err); 
        res.status(500).json({message:"Lỗi khi tìm kiếm sản phẩm!"})
    }
};

exports.searchProductWomen= async(req, res)=>{  
    const search= req.query.search||"";
    const gender= req.params;
    try{
        const result= await Product.find({ 
            name:{$regex: search, $options:"i"},
            gender: "Women"
        });
        res.json(result);
    }catch (err){
        console.error("Lỗi searchProducts:", err); 
        res.status(500).json({message:"Lỗi khi tìm kiếm sản phẩm!"})
    }
};

exports.getByCategory= async (req, res) => {
  const { categoryId } = req.params;
  try {
    const products = await Product.find({ category: categoryId}).populate("category");
    res.json(products);
  } catch (err) {
    console.error("Lỗi getByCategory:", err);
    res.status(500).json({ message: "Lỗi khi lấy sản phẩm theo danh mục!" });
  }
};

exports.getByCategorygender= async (req, res) => {
  const { categoryId, gender } = req.params;
  try {
    const products = await Product.find({ category: categoryId, gender: gender }).populate("category");
    res.json(products);
  } catch (err) {
    console.error("Lỗi getByCategory:", err);
    res.status(500).json({ message: "Lỗi khi lấy sản phẩm theo danh mục!" });
  }
};

exports.get= async(req, res)=>{
    const product= await Product.find();
    res.json(product);
};

exports.post= async(req, res)=>{
    const {name, price, image, description, category, gender}= req.body;
    if(!name || ! price || !image || !description || !category || !gender){
        res.status(400).json({message: "thiếu thông tin!"});
        return;
    }
    try{
        const newProduct= new Product({name, price, image, description, category, gender});
        await newProduct.save();
        res.json({message:"thêm thành công!", product: newProduct});
    }catch(err){
        res.status(500).json({message:"Lỗi Server!"});
    }
};

exports.delete= async(req, res)=>{
    const {id}= req.params;
    try{
        const deleted= await Product.findByIdAndDelete(id);
        if(!deleted) return res.status(404).json({message:"Không tìm thấy sản phẩm!"});
    }catch (err){
        res.status(500).json({message:"Lỗi Server!"});
    }
};

exports.patch= async(req, res)=>{
    const {id}= req.params;
    try{
        const patched= await Product.findByIdAndUpdate(
            id,
            req.body,
            {new: true}
        );
        if(!patched) return res.status(404).json({message:"Không tìm thấy sản phẩm!"});
        res.json({message:"Đã sửa!", product: patched});
    }catch (err){
        res.status(500).json({message:"Lỗi server!"});
    }
};

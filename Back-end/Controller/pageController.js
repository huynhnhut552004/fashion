const Page= require("../Models/Page");

exports.getById= async (req, res) => {
    try {
        const { id } = req.params;
        const page = await Page.findById(id);
        if (!page) {
            return res.status(404).send("Không tìm thấy trang!");
        }
        res.json(page);
    } catch (err) {
        res.status(500).json({ message: "Lỗi server!" });
    }
};

exports.patch= async(req, res)=>{
    const {id}= req.params;
    try{
        const patched= await Page.findByIdAndUpdate(
            id,
            req.body,
            {new: true}
        );
     if(!patched) return res.status(404).json({message:"Không tìm thấy!"});
        res.json({message:"Đã sửa!", product: patched});
    }catch (err){
        res.status(500).json({message:"Lỗi server!"});
    }
}
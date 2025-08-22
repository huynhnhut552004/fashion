const Voucher = require("../Models/Voucher");

exports.getvoucherbyname= async (req, res)=>{
    const name= req.params.name;
    try{
        const voucher= await Voucher.find({name: name});
        if(voucher.length === 0){return res.status(404).json({message:"Voucher không tồn tại!"})};
        res.json(voucher);
    }catch(err){
        res.status(500).json({message:"Lỗi Server!"});
    }
}

exports.get= async(req, res)=>{
    const voucher= await Voucher.find();
    res.json(voucher);
}

exports.post= async(req, res)=>{
    const {name, discount, description}= req.body;
    try{
        const newVoucher= new Voucher({name, discount, description});
        await newVoucher.save();
        res.json({message:"thêm thành công!", voucher: newVoucher});
    }catch(err){
        res.status(500).json({message:"Lỗi Server!"});
    }
};

exports.patch= async(req, res)=>{
    const {id}= req.params;
    try{
        const patched= await Voucher.findByIdAndUpdate(
            id,
            req.body,
            {new: true}
        );
        if(!patched) return res.status(404).json({message:"Không tìm thấy voucher!"});
        res.json({message:"Đã sửa!", voucher: patched});
    }catch (err){
        res.status(500).json({message:"Lỗi server!"});
    }
};

exports.delete= async(req, res)=>{
    const {id}= req.params;
    try{
        const deleted= await Voucher.findByIdAndDelete(id);
        if(!deleted) return res.status(404).json({message:"Không tìm thấy voucher!"});
    }catch (err){
        res.status(500).json({message:"Lỗi Server!"});
    }
};

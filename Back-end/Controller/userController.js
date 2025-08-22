const User= require("../Models/User");

exports.get= async(req, res)=>{
    const user= await User.find();
    res.json(user);
};

exports.patch= async(req,res)=>{
    const {id}= req.params;
        try{
            const patched= await User.findByIdAndUpdate(
                id,
                req.body,
                {new: true}
            );
            if(!patched) return res.status(404).json({message:"Không tìm thấy tài khoản!"});
            res.json({message:"Đã sửa!", user: patched});
        }catch (err){
            res.status(500).json({message:"Lỗi server!"});
        }
};

exports.delete= async(req, res)=>{
    const {id}= req.params;
    try{
        const deleted= await User.findByIdAndDelete(id);
        if(!deleted) return res.status(404).json({message:"Không tìm thấy tài khoản!"});
    }catch (err){
        res.status(500).json({message:"Lỗi Server!"});
    }
};
 
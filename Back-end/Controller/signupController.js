const User= require("../Models/User");
const bcrypt = require("bcrypt");
exports.accout= async(req, res)=>{
    try {
        const {username, password, firstName, lastName}= req.body;
        if(!username || !password || !firstName || !lastName){
            return res.status(400).json({message:"Thiếu thông tin!"});
        }
        const existingUser = await User.findOne({ username });
        if(existingUser){
            return res.status(409).json({message:"Tên người dùng đã tồn tại!"});
        }
        const newUser= new User({
            username, 
            password: password,
            firstName,
            lastName
        });
        await newUser.save();
        res.status(201).json({message:"Đăng ký thành công!"});
    }catch (err){
        res.status(500).json({message:"Lỗi server!", error:err});
    }
}
const User= require("../Models/User");
const bcrypt = require("bcrypt");

exports.checkEmail = async (req, res) => {
    try {
        const { username } = req.body;
        if (!username) return res.status(400).json({ message: "Thiếu email!" });
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: "Email không tồn tại!" });
        res.status(200).json({ message: "Email hợp lệ!", userId: user._id });
    } catch (err) {
        res.status(500).json({ message: "Lỗi server!", error: err });
    }
};

exports.restore = async (req, res) => {
    try {
        const { id } = req.params; 
        const { password } = req.body;
        
        if (!password) {
            return res.status(400).json({ message: "Thiếu thông tin!" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.findByIdAndUpdate(id, { password: hashedPassword });

        if (!user) {
            return res.status(404).json({ message: "Không tìm thấy người dùng!" });
        }
        res.status(200).json({ message: "Đổi mật khẩu thành công!" });
    } catch (err) {
        res.status(500).json({ message: "Lỗi server!", error: err });
    }
};
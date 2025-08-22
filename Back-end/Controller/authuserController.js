const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../Models/User");
const generateToken = require("../Utils/generateToken");

exports.loginUser = async (req, res) => {
  let { username, password } = req.body;
  username = username?.trim();
  password = password?.trim();

  if (!username || !password) {
    return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin!" });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu!" });
    }
    if(user.ban){
      return res.status(403).json({message:"Tài khoản của bạn đã bị cấm!"});
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu!" });
    }
    const token = generateToken({ _id: user._id, role: "user" });
    return res.json({ token, role: "user" });
  } catch (err) {
    return res.status(500).json({ message: "Lỗi server!", error: err });
  }
};

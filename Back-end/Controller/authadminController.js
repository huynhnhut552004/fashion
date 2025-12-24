const Admin = require("../Models/Admin");
const generateToken = require("../Utils/generateToken");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.loginAdmin = async (req, res) => {
  let { username, password } = req.body;
  username = username?.trim().toLowerCase();
  password = password?.trim().toLowerCase();
  if (!username || !password) {
    return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin!" });
  }
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu!" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu!" });
    }
    const token = generateToken({ role: admin.role, username: admin.username });
    return res.json({ token, role: admin.role });
  } catch (err) {
    return res.status(500).json({ message: "Lỗi server!", error: err });
  }
};
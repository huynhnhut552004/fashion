const Page = require("../Models/Page");
const checkEditing = async (req, res, next) => {
  const pageId = req.params.id;
  try {
    const page = await Page.findById(pageId);
    if (!page) return res.status(404).json({ message: "Không tìm thấy trang!" });
    if (page.isEditing) {
      return res.status(423).json({ message: "Trang đang được chỉnh sửa bởi admin!" });
    }
    next();
  } catch (err) {
    return res.status(500).json({ message: "Lỗi server!", error: err });
  }
};

module.exports = checkEditing;
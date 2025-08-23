const Page = require("../Models/Page");
const cloudinary = require('cloudinary').v2;

exports.getById = async (req, res) => {
    try {
        const { id } = req.params;
        const page = await Page.findById(id);
        if (!page) {
            return res.status(404).send("Không tìm thấy trang!");
        }
        res.json(page);
    } catch (err) {
        console.error("Lỗi getById:", err);
        res.status(500).json({ message: "Lỗi server!" });
    }
};

exports.patch = async (req, res) => {
    const { id } = req.params;
    try {
        const oldPage = await Page.findById(id);
        if (!oldPage) {
            return res.status(404).json({ message: "Không tìm thấy!" });
        }

        const newSections = req.body.sections;
        
        for (const key in newSections) {
            if (newSections[key].publicId) {
                const oldPublicId = oldPage.sections[key]?.publicId;
                const newPublicId = newSections[key].publicId;

                if (oldPublicId && oldPublicId !== newPublicId) {
                    const resource_type = newSections[key].videoUrl ? 'video' : 'image';
                    await cloudinary.uploader.destroy(oldPublicId, { resource_type });
                }
            }
        }

        const patched = await Page.findByIdAndUpdate(
            id,
            req.body,
            { new: true, overwrite: true } 
        );
        
        if (!patched) {
            return res.status(404).json({ message: "Không tìm thấy!" });
        }
        
        res.json({ message: "Đã sửa!", page: patched });
    } catch (err) {
        console.error("Lỗi patch:", err);
        res.status(500).json({ message: "Lỗi server!" });
    }
};

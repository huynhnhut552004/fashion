const Order= require("../Models/Order");

exports.getOrderByUserId = async (req, res) => {
    try { 
        const cart = await Order.find().populate('items.productId').populate('voucher').populate('userId');
        if (!cart) {
            return res.status(404).json({ message: 'Giỏ hàng không tồn tại.' });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const {id} = req.params;
        const result = await Order.deleteOne({ userId: id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Giỏ hàng không tồn tại.' });
        }
        res.status(200).json({ message: 'Đã xóa toàn bộ giỏ hàng thành công.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addOrder = async (req, res) => {
    try {
        const { items, voucher, subtotal, userId } = req.body;

        if (!userId) {
            return res.status(401).json({ message: "Không có user id" });
        }

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: "Thiếu sản phẩm trong đơn hàng!" });
        }

        if(!subtotal){
            return res.status(400),json({message:"Thiếu giá tổng sản phẩm!"});
        }
        
        const order = new Order({
            userId: userId,
            items: items,
            voucher: voucher || null,
            subtotal: subtotal
        });

        await order.save();
        return res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
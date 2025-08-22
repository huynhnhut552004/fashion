const Cart= require("../Models/Cart");
const Product = require('../Models/Product');
const Voucher = require('../Models/Voucher');

exports.getCartByUserId = async (req, res) => {
    try {
        const userId = req.user.userId; 
        const cart = await Cart.findOne({ userId: userId }).populate('items.productId').populate('voucher');
        if (!cart) {
            return res.status(404).json({ message: 'Giỏ hàng không tồn tại.' });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addItemToCart = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { productId } = req.params;
        const quantityToAdd = 1;

        if (!userId) {
            return res.status(401).json({ message: "Không có user id" });
        }
        if (!productId) {
            return res.status(400).json({ message: "Không có id product" });
        }
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Sản phẩm không tồn tại." });
        }

        let cart = await Cart.findOne({ userId: userId });
        if (!cart) {
            cart = new Cart({
                userId: userId,
                items: [{ productId: productId, quantity: quantityToAdd }]
            });
            await cart.save();
            return res.status(201).json(cart);
        }

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantityToAdd;
        } else {
            cart.items.push({ productId: productId, quantity: quantityToAdd });
        }
        
        await cart.save();
        res.status(200).json(cart);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateItemQuantity = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId, quantity } = req.body; 
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Giỏ hàng không tồn tại." });
    }
    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Sản phẩm không có trong giỏ hàng." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.applyVoucherToCart = async (req, res) => {
    const userId = req.user.userId;
    const { voucherId } = req.body;
    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId');

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Giỏ hàng trống' });
        }

        const subtotal = cart.items.reduce((total, item) => {
            return total + item.productId.price * item.quantity;
        }, 0);

        if (!voucherId) {
            cart.total = subtotal;
            cart.voucher = null;
            await cart.save();
            return res.status(200).json({ message: 'Không có mã giảm giá nào được áp dụng', cart });
        }
        const voucher = await Voucher.findById(voucherId);
        if (!voucher) {
            return res.status(404).json({ message: 'Mã giảm giá không hợp lệ!' });
        }
        const discountAmount = voucher.discount;
        const totalAfterDiscount = subtotal - (subtotal * discountAmount / 100);
        cart.voucher = voucherId;
        cart.total = totalAfterDiscount;
        await cart.save();
        res.status(200).json({ message: 'Áp dụng mã giảm giá thành công!', cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};


exports.removeItemFromCart = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { productId } = req.body;

        const cart = await Cart.findOne({ userId: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Giỏ hàng không tồn tại.' });
        }

        const initialLength = cart.items.length;
        cart.items = cart.items.filter(item => item.productId.toString() !== productId);

        if (cart.items.length === initialLength) {
            return res.status(404).json({ message: 'Sản phẩm không có trong giỏ hàng.' });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.clearCart = async (req, res) => {
    try {
        const userId = req.user.userId; 

        const result = await Cart.deleteOne({ userId: userId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Giỏ hàng không tồn tại.' });
        }

        res.status(200).json({ message: 'Đã xóa toàn bộ giỏ hàng thành công.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
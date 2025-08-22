const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
});

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true,
        unique: true 
    },
    items: [cartItemSchema],
    voucher: { 
        type: Schema.Types.ObjectId,
        ref: "Voucher",
        default: null
    },
    total: { 
        type: Number,
        default: 0
    }
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
const mongoose= require("mongoose");
const Schema = mongoose.Schema;

const OrderProductItems = new Schema({
    productId: {type: Schema.Types.ObjectId, ref: 'Product', required: true},
    quantity: {type: Number,required: true}});

const orderSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [OrderProductItems],
    voucher: { type: Schema.Types.ObjectId, ref: "Voucher"},
    subtotal: { type: Number, required: true},
    code: {type: String, unique: true},
    creatAt: {type: Date, default: Date.now},
});

orderSchema.pre("save", async function (next) {
    if (!this.code) {
        const count = await this.constructor.countDocuments();
        this.code = `ORD${(count + 1).toString().padStart(4, "0")}`;
    }
    next();
});

module.exports= mongoose.model("Order", orderSchema);
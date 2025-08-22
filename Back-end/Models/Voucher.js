const mongoose= require("mongoose");
const voucherSchema = new mongoose.Schema({
    creatAt: {type: Date, default: Date.now},
    name: {type: String, required: true},
    discount: {type: Number},
    description: {type: String},
});

module.exports= mongoose.model("Voucher", voucherSchema); 

const mongoose= require("mongoose");
const productsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    image: {
        publicId: { type: String, required: true },
        imageUrl: { type: String, required: true }
    },
    description: {type: String},
    category: {type: mongoose.Schema.Types.ObjectId, ref: "Category", required:true},
    gender:{type: String, required: true}
});

module.exports= mongoose.model("Product", productsSchema);
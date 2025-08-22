const mongoose= require("mongoose");
const productsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: String, unique: true},
    description: {type: String},
    category: {type: mongoose.Schema.Types.ObjectId, ref: "Category", required:true},
    gender:{type: String, required: true}
});

module.exports= mongoose.model("Product", productsSchema);
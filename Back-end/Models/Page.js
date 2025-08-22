const mongoose = require("mongoose");
const pageSchema = new mongoose.Schema({
    pageName: { type: String, required: true, unique: true },
    sections: {
        type: Object, 
        default: {}
    }
});

module.exports = mongoose.model("Page", pageSchema);
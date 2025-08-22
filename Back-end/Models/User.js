const mongoose= require("mongoose");
const bcrypt= require("bcrypt");
const userSchema= new mongoose.Schema({
    username: {type: String, required: true}, 
    password: {type: String, required: true},
    firstName: {type: String},
    lastName: {type: String},
    role: {type: String, default: "User"},
    ban: {type: Boolean, default: false},
    creatAt: {type: Date, default: Date.now}
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password= await bcrypt.hash(this.password,10);
    next();
});

module.exports= mongoose.model("User", userSchema);
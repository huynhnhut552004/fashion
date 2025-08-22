const mongoose = require("mongoose");
const connect= async()=>{
    try{
        await mongoose.connect(
            process.env.MONGO_URL,
            {
                useNewUrlParser:true,
                useUnifiedTopology: true,
                dbName: "Fashion_Page"
            }
        );
        console.log("Kết nối csdl thành công!");
    }catch (err){
        console.log("Kết nối csdl thất bại!");
    }
};
module.exports= connect;
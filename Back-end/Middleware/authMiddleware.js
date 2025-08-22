const jwt = require("jsonwebtoken");
function authMiddleware(req, res, next){
    const token= req.headers.authorization?.split(" ")[1];
    if(!token) return res.status(401).json({message:"Thiếu Token!"});
    try{
        const decoded= jwt.verify(token, process.env.JWT_SECRET);
        req.user= decoded;
        next();
    }catch{
        return res.status(401).json({message:"Token không hợp lệ"});
    }
}

function requireAdmin(req, res, next){
    if(req.user?.role!=="Admin"){
        return res.status(403).json({message:"Không đủ quyền Admin!"});
    }
    next();
}
module.exports={authMiddleware, requireAdmin};
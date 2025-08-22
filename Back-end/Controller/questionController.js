const Question= require("../Models/Question");

exports.get= async (req,res)=>{
    const question= await Question.find();
    res.json(question);
};

exports.post= async(req,res)=>{
    const {email, question}=req.body;
    try{
        const newQuestion= new Question({email, question});
        await newQuestion.save();
        res.json({message:"Gửi thành công!", question: newQuestion})
    }catch(err){
        res.status(500).json({message:"Lỗi server!"});
    }
};

exports.delete= async(req, res)=>{
    const {id}= req.params;
    try{
        const deleted= await Question.findByIdAndDelete(id);
        if(!deleted) return res.status(404).json({message:"Không tìm thấy!"});
    }catch (err){
        res.status(500).json({message:"Lỗi Server!"});
    }
};
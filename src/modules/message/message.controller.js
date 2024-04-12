import messageModel from "../../../DB/models/Message.model.js";
import userModel from "../../../DB/models/User.model.js";

export const getMessages= async (req,res)=>{
   const messageList = await messageModel.find({recieverId:req.user._id}).select('content createdAt')
return res.json({message:"success",messageList})
}

export const sendMessage = async(req,res)=>{
    const {recieverId}=req.params;
    const {message}=req.body;
    const user = await userModel.findById(recieverId);
    if(!user){
        return res.status(404).json("user not found")
    }
    const createMessage =  await messageModel.create({content: message , recieverId});
    return res.status(201).json({message:"success",createMessage})
}
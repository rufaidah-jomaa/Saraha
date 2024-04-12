import userModel from "../../../DB/models/User.model.js"

export const getUsers=(req,res)=>{
    return res.json("users")
}
export const getProfile = async(req,res)=>{
 const user = await userModel.findById(req.user._id)
 return res.json({message:"success",user})

}
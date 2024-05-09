import commentModel from "../../../DB/models/Comment.model.js";
import postModel from "../../../DB/models/Post.model.js";
import cloudinary from "../../services/cloudinary.js";


export const getPosts=async(req,res,next)=>{
const posts = await postModel.find({}).populate([
    {
        path:'user_id',
        select:'userName'
    },
    {
        path: 'like',
        select:'userName'
    }
])
return res.json({message:"success",posts})
}
export const testPost=(req,res)=>{
    return res.json("hello from post")
}
export const createPost=async(req,res)=>{
    const {title,body}=req.body;
   const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.App_Name}/post`})
    //public id to remove the picture from cloudinary when an product is deleted(E-commerce)
    const post = await postModel.create({title,body,image:{secure_url,public_id},user_id:req.user_id})//id from token 
    if(!post){
        return next(new Error("Couldn't create post"))
    }
    return res.json({message:"success",post})
}

export const likePost=async(req,res,next)=>{
    const user_id = req.user._id;
    const {id} = req.params; //postId
    const like= await postModel.findByIdAndUpdate({_id:id},
        {
            $addToSet:{ //add to set ما بتضيف اشياء موجودة(ما بتكرر )   ... push بتسمح بالتكرار 
                like:user_id
            }
        },{new:true}
    )
    //OR:
    /*const like= await postModel.findByIdAndUpdate({_id:id,like:{$nin:user_id}},         يعني بقدر استخدم push   .. بس بعطيه شرط انه اليوزر اي دي مش موجود من قبل بالارريه
                                                           (nin:not in)
        {          
              $push:{ 
                like:user_id
            }
        },{new:true}
    )*/
    if(!like){
        return next(new Error("could not add like to the post"))
    }
    return res.json({message:"success",like});
}

export const createComment= async(req,res,next)=>{
    req.body.user_id=req.user._id
    req.body.post_id=req.params.id
    if(req.file){
     const {secure_url,public_id} =await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.App_Name}/comment/${req.body.post_id}`})
     req.body.image = {secure_url,public_id}
    }
    const comment = await commentModel.create(req.body)
    return res.json({message:"success",comment})
}
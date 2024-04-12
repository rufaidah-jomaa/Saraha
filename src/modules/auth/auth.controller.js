import userModel from '../../../DB/models/User.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { signupSchema } from './auth.validation.js'
import sendEmail from '../../services/sendEmail.js'

export const getAuth=(req,res)=>{
    return res.json("authorization")
}

export const signup= async(req,res)=>{
    
    const {userName,email,password}=req.body;
    const user=await userModel.findOne({email: email})
    if(user){
        return res.json('email is already existing')
    }
    const hashedPassword = await bcrypt.hash(password,parseInt(process.env.SALT_ROUND))

    const newUser=await userModel.create({userName,email,password:hashedPassword})
    if(!newUser){
        return res.json('error while creating user')

    }
    const token =  jwt.sign({email},process.env.confirmEmailSIG,{expiresIn:60*60})
    const refreshToken = jwt.sign({email},process.env.confirmEmailSIG,{expiresIn:60*60*24*7})
     const html =
     `<h2> Hello ${userName}</h2>
         <a href='${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}'>confirm your email</a> 
         <a href ='${req.protocol}://${req.headers.host}/auth/newconfirmEmail/${refreshToken}'>resend confirm Email</a> 
     `;
     await sendEmail(email,"Welcome to Saraha " , html)
    return res.status(201).json({message:"success",newUser}) //عشان الكونفيرم ايميل بدي اوخذ ايميل اليوزر و ابحث عنه و اخلي الكونفيرم ايميل الخاص فيه ترو 
}
export const confirmEmail= async(req,res)=>{
    const {token}= req.params;
    const decoded = jwt.verify(token,process.env.confirmEmailSIG)
    const user = await userModel.updateOne({email:decoded.email}, {confirmEmail:true});
   if(user.modifiedCount>0)
   {
    return res.redirect(process.env.FEURL)
   }
    
}

export const signin = async (req, res) => {
    const {email,password}=req.body;
    const user = await userModel.findOne({email: email})
    if(!user){
        return res.json("email not exist")
    }
    if(!user.confirmEmail){
        return res.json("pleaze confirm your Email")
    }
    const matchPassword = await bcrypt.compare(password, user.password)
    if(!matchPassword){
        return res.json("password is incorrect")
    }
   const token = jwt.sign({ id:user._id }, process.env.LOGINSIG);
    return res.json({message:"success",token})
}
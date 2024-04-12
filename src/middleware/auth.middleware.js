import jwt from 'jsonwebtoken'    
import userModel from '../../DB/models/User.model.js';
export const auth = async(req,res,next)=>{ // to check if user has logged in or not 

    const {authorization}=req.headers;
    if(!authorization.startsWith(process.env.BEARERKEY)){
        return res.json("invalid authorization")
    }
  const token = await authorization.split(process.env.BEARERKEY)[1];
  const decoded =  jwt.verify(token,process.env.LOGINSIG)
  const user = await  userModel.findById(decoded.id).select ('userName')
 req.user = user;
  next();
}
import  { Schema, model,Types } from 'mongoose';
const messageSchema = new Schema({
 content:{
    type:String,
    required:true
 },
 recieverId:{
    type:Types.ObjectId,
    required:true
 }
  
},{
    timestamps:true
});

const messageModel = model('Message',messageSchema);
export default messageModel;
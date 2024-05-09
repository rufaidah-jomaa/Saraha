import multer from 'multer';
import { nanoid } from 'nanoid';

export const fileValidation={
    image:['image/jpeg','image/png','image/jpg','image/svg+xml'],
    pdf : ['application/pdf']
}
function fileUpload(customValidation=[]){

const storage =multer.diskStorage({})


function fileFilter (req,file,cb){
    
if(customValidation.includes(file.mimetype) ){
    cb(null,true);
}else{
 cb("invalid file",false)
console.log(req.file);
}
}
const upload=multer({fileFilter,storage})
return upload
}
export default fileUpload;
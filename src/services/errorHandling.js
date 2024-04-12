//اسينك هاندلر حتوخذ مني فنكشن و ترجع ريكويست و ريسبونس
export const asyncHandler=(func)=>{
    return (req,res,next)=>{
    func(req,res,next)
    .catch(error=>{
        return res.json({message:"catch error",error:error.stack})
    })
    }
}
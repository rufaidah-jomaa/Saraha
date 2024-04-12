const dataMethods =['body', 'query', 'params','headers'];
const validation = (schema) => {
 
  return (req, res, next) => {
    const validationError=[]
    /*if(schema.body){
        const validationResult=schema.body.validate(req.body,{abortEarly:false})
        if(validationResult.error){
            validationError.push(validationResult.error)
        }
    }if(schema.query){
        const validationQueryResult=schema.query.validate(req.query,{abortEarly:false})
        if(validationQueryResult.error){
            validationError.push(validationQueryResult.error)
        }
    }
   if(validationError.length>0){
    return res.status(400).json({message:"validation Error",validationError})
   }*/
   //تحسين للكود
   dataMethods.forEach(key=>{
    if(schema[key]){
     const validationResult=schema[key].validate(req[key],{abortEarly:false})
     if(validationResult.error){
        validationError.push(validationResult.error)
     }
    }
   })
   if(validationError.length>0){
    return res.status(400).json({message:"validation Error",validationError})
   }
   next()
}
}
export default validation; 

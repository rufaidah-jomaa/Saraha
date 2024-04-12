import joi from 'joi'

export const signupSchema={
   body:joi.object({
    userName:joi.string().min(3).max(20).required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).max(20).required(),
    cPassword: joi.valid(joi.ref('password')).required()
}),
query:joi.object({
    test:joi.boolean().required()
})
}

export const signinSchema=joi.object({
   
    email: joi.string().email().required(),
    password: joi.string().min(8).max(20).required(),

})
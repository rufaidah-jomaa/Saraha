import joi from 'joi'
import { generalFields } from '../../middleware/validation.middleware.js'

export const signupSchema={
   body:joi.object({
    userName:joi.string().min(3).max(20).required(),
    email: generalFields.email,
    password: generalFields.password,
    cPassword: joi.valid(joi.ref('password')).required()
}),
query:joi.object({
    test:joi.boolean().required()
})
}

export const signinSchema=joi.object({
   
    email: generalFields.email,
    password: generalFields.password,

})
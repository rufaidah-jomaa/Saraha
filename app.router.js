import connectDB from './DB/connection.js'
import authRouter from './src/modules/auth/auth.router.js'
import userRouter from './src/modules/user/user.router.js'
import postRouter from './src/modules/post/post.router.js'
import { globalErrorHandler } from './src/services/errorHandling.js'
export const initApp=(app,express)=>{

    app.use(express.json());
   connectDB();
    
    app.use('/auth',authRouter)
    app.use('/user',userRouter)
    app.use('/post',postRouter)
    app.use("*",(req,res)=>{
        return res.json("Page Not Found")
    })
  app.use(globalErrorHandler)
}



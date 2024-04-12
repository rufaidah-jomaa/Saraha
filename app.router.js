import connectDB from './DB/connection.js'
import messageRouter from './src/modules/message/message.router.js'
import authRouter from './src/modules/auth/auth.router.js'
import userRouter from './src/modules/user/user.router.js'
export const initApp=(app,express)=>{

    app.use(express.json());
   connectDB();
    app.use('/message',messageRouter);
    app.use('/auth',authRouter);
    app.use('/user',userRouter)
    app.use("*",(req,res)=>{
        return res.json("Page Not Found")
    })
}



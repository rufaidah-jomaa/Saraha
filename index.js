import express from 'express'
import { initApp } from './app.router.js';
import 'dotenv/config' 
const app = express()
const PORT=process.env.PORT
initApp(app,express);


app.listen( PORT,()=>{
    console.log(`server is running on ${PORT}`) 
})
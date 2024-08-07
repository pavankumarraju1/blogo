import 'dotenv/config'
import express from "express"
import path from "path"
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

import ejsRouter from './routes/ejsRoutes.js';
import userRouter from './routes/user.js';
import blogRouter from './routes/blogRoutes.js';
import commentRouter from './routes/commentRouter.js';

//import connection from './connection.js'; 
import checkAuthCookie from './middlewares/authenticatication.js';
 
const PORT = process.env.PORT || 8000


//connection(process.env.db_url).catch((err) => console.log(err))
async function connection(){
    await mongoose.connect(process.env.db_url);
    console.log("db connected");
}

connection().then((res)=>console.log(res)).catch(err=>console.log(err));

const app = express();   
 
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.static(path.resolve('./public')))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(checkAuthCookie("token"))

app.use("/",ejsRouter)
app.use("/user",userRouter) 
app.use("/blog",blogRouter)
app.use("/comment",commentRouter)
 

app.listen(process.env.PORT,()=>{ 
    console.log(`server started ${PORT}`)
})   
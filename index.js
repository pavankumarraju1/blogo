import 'dotenv/config'
import express from "express"
import path from "path"
import cookieParser from 'cookie-parser';

import ejsRouter from './routes/ejsRoutes.js';
import userRouter from './routes/user.js';
import blogRouter from './routes/blogRoutes.js';
import commentRouter from './routes/commentRouter.js';

import connection from './connection.js'; 
import checkAuthCookie from './middlewares/authenticatication.js';
 
const PORT = process.env.PORT || 8000

const app = express();   

connection(process.env.db_url).catch((err) => console.log(err))
  
 
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
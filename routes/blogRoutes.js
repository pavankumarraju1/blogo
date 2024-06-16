import { Router } from "express";
import multer from "multer";
import path from "path"
import blogModel from "../models/blog.js";


const blogRouter = Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve("./public/blogImages/"))
    },
    filename: function (req, file, cb) {
        const filename = `${Date.now()}-${file.originalname}`
        cb(null,filename)
    }
})

const upload = multer({ storage: storage })



blogRouter.post("/addBlog",upload.single('coverImage'),async(req,res)=>{
    const {title,content} = req.body;
    const blog = await blogModel.create({
        title,
        content,
        createdBy:req.user._id, 
        coverImage: `/blogImages/${req.file.filename}`
    })
    res.redirect('/')
})


export default blogRouter;
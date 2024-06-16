import blogModel from "../models/blog.js";

import { Router } from "express";
import commentModel from "../models/comment.js";

const ejsRouter = Router()


ejsRouter.get("/signup", (req, res) => {
    res.render("signup")
})

ejsRouter.get("/login", (req, res) => {
    res.render("login")
})

ejsRouter.get("/addblog",(req,res)=>{
    res.render("addBlog",{
        user:req.user
    });
}) 


ejsRouter.get('/', async (req, res) => {
    const blogData = await blogModel.find({});
    //console.log(blogData) 
    res.render('home', {
        user: req.user,
        blogs: blogData,
    })
})



ejsRouter.get("/:_id", async (req, res) => {
    const blogData = await blogModel.findById(req.params._id).populate("createdBy")
    //console.log("now",blogData)
    const commData = await commentModel.find({blogId:req.params._id}).populate("createdBy")
    //console.log(commData)
    return res.render("blogShow", { 
        user: req.user,
        blogs: blogData, 
        comment:commData
    })
}) 

export default ejsRouter;
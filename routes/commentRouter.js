import express from "express";
import commentModel from "../models/comment.js";
const commentRouter = express.Router()

commentRouter.post('/:_blogId',async(req,res)=>{
    const blogid = req.params._blogId
    //console.log(blogid)
    await commentModel.create({
        content:req.body.content,
        blogId:req.params._blogId, 
        createdBy:req.user._id
    }) 
    return res.redirect(`/${blogid}`)
})


export default commentRouter;
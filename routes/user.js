import { Router } from "express";
import userModel from "../models/user.js";
import bcrypt from "bcrypt"
import { createToken } from "../service/auth.js";
import multer from "multer";
import path from "path"

const userRouter = Router()

const rounds = 10;

 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve("./public/profileImages/"))
    },
    filename: function (req, file, cb) {
        const filename = `${Date.now()}-${file.originalname}`
        cb(null, filename)
    }
})

const upload = multer({ storage: storage })


userRouter.post("/signup", upload.single('profileImage'), async (req, res) => {
    const { username, email, password } = req.body;
    try { 
        const existUser = await userModel.findOne({ email }); 
        //console.log(existUser)
        if (existUser) {
            res.render('signup', {
                signupMsg: "email already exixts!! try again"
            })  
        }
        else {
            bcrypt.hash(password, rounds, async (err, hash) => {
                if (err) {
                    console.log("error in hashing", err)
                }
                else {
                    await userModel.create({
                        username: username,
                        email: email,
                        password: hash,
                        profileImage: `/profileImages/${req.file.filename}`
                    }) 
                    res.redirect('/login')
                }
            })
        }
    } catch (error) {
        console.log(error)
        res.render('signup')
    }

})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email })
        
        if(!user){
            return res.render('login',{
                loginMsg:"No details found on this email"
            }) 
        }
        const hashPass = user.password;
        bcrypt.compare(password, hashPass, (err, result) => {
            if (err) {  
                console.log("error in comparision of password", err)
            }
            if (result) {
                const token = createToken(user)
                //console.log(token)
                return res.cookie("token", token).redirect("/")
            }
            else { 
                res.render('login', {
                    loginMsg: "incorrect email or password",
                }) 
            }
        })
    } catch (error) {
        console.log(error)
        res.render('login', { 
            loginMsg: "details not matching" 
        })
    }

})

userRouter.get('/logout', (req, res) => {
    return res.clearCookie("token").redirect('/');
})



export default userRouter;
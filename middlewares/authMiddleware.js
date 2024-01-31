import  JWT  from "jsonwebtoken";
import userModel from "../models/user.model.js";
// authorization
export const requireSignIn = async (req,res,next) =>{
    try {
        const token = req.headers.authorization
        if(!token){
            return res.status(402).send({
                success:false,
                message:"please login"
            })
        }
        const decode = await JWT.verify(token,process.env.JWT_SECRET);
        req.user = decode;
        next()
    } catch (error) {
        console.log(error)
        res.status(402).send({
            success:false,
            message:"something went wrong"
        })
    }
}

// checking that login user isadmin
export const isAdmin = async (req,res,next) =>{
   try {
    const user = await userModel.findById(req.user._id);
    if(user.role !== 1){
       return res.status(401).send({
            success:false,
            Message:"unauthorized access"
        })
    }
    else{
        next()
    }
   } catch (error) {
    console.log(error)
    res.status(400).send({
        success:false,
        message:"error in admin middleware"
    })
   }
}
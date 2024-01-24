import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/user.model.js"
import JWT from 'jsonwebtoken'


// Register new user 
export const registerController = async (req,res) =>{
    
    try {
        const {name,email,password,phone,address,role} = await req.body;

    // checking user
    const existingUser = await userModel.findOne({email});

    //if user already exist with same email
    if(existingUser){
        return res.status(409).send({ success:false , message:"Email is already in use."})
    }

    //hasing password
    const hashedPassword = await hashPassword(password)

    // creating new user after checking all details
    const user = await new userModel({name,email,password:hashedPassword,phone,address,role}).save()
    return res.status(201).send({
        success:true,
        message:"registration successfull",
        user
    })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"something went wrong"
        })
    }
}


// Login user 
export const loginController = async (req,res) =>{
    try {
        const {email,password} = req.body;

        // validation - user entered email and password or not ?
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:'please provide an email and a password',
            })
        }

        // check user
        const user = await userModel.findOne({email})
        if(!user){
           return  res.status(404).send({
                success:false,
                message:"email is not registered"
            })
        }
        //matching password
        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(500).send({
                success:false,
                message:"invalid email or password"
            })
        }

        // creating token
        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
        return res.status(200).send({
            success:true,
            message:"login successfully",
            user,
            token
        })
    
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in login",
            error
        })
    }
}


//test controller
export const testController = async(req,res) =>{
    res.send("routes")
}

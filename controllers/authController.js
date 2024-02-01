import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import orderModel from '../models/order.model.js'
import userModel from "../models/user.model.js"
import JWT from 'jsonwebtoken'


// Register new user 
export const registerController = async (req,res) =>{
    
    try {
        const {name,email,password,phone,address,securitykey,role} = await req.body;

    // checking user
    const existingUser = await userModel.findOne({email});

    //if user already exist with same email
    if(existingUser){
        return res.status(409).send({ success:false , message:"Email is already in use."})
    }

    //hasing password
    const hashedPassword = await hashPassword(password)

    // creating new user after checking all details
    const user = await new userModel({name,email,password:hashedPassword,phone,address,securitykey,role}).save()
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

export const forgetPasswordController = async(req,res) =>{
    try {
        const {email,newpassword,securitykey} = req.body;
        if(!email){
            return res.status(401).send({success:false,message:"email is required"})
        }
        if(!newpassword){
            return res.status(401).send({success:false,message:"new password is required"})
        }
        if(!securitykey){
            return res.status(401).send({success:false,message:"security key is required"})
        }

        //check user 
        const user = await userModel.findOne({email});
        //validation
        if(!user){
            return res.status(404).send({success:false,message:"email is not registered"})
        }

        if(securitykey !== user.securitykey){
            return res.status(500).send({success:false,message:"please check your security key"})
        }
        //hashing new password
        const hashed = await hashPassword(newpassword)

        //updating password
        await userModel.findByIdAndUpdate(user._id,{password:hashed})
        res.status(200).send({success:true,message:"password reset successfully"})

    } catch (error) {
        console.log("error in forget password controller")
        return res.status(500).send({
            success:false,
            message:"something went wrong",
            error
        })
    }
}

//test controller
export const testController = async(req,res) =>{
    res.send("routes")
}

export const updateProfileController = async(req,res) =>{
    try {
        const {name,email,password,phone,address} = req.body
        const user = await userModel.findById(req.user._id)

        const hashedPassword =  password ? await hashPassword(password) : undefined;
        const updateUser = await userModel.findByIdAndUpdate(req.user._id,{
            name:name || user.name,
            password:hashedPassword || user.password,
            phone:phone || user.phone,
            address:address || user.address,
        })
        res.status(200).send({
            success:true,
            message:"profile Updated",
            updateUser
        })
    } catch (error) {
        res.status(405).send({
            success:false,
            message:"something wrong in upatng profile",
            error

        })
    }
}


export const getOrdersController = async (req,res) =>{
    try {
        const orders = await orderModel.find({buyer:req.user._id}).populate("buyer").populate("products","-photo")
        res.status(201).send({
            success:true,
            message:"all order fetched",
            orders
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            messege:"error in getting orders",
            error
        })
    }
}

export const getAllOrdersController = async(req,res)=>{
    try {
        const orders = await orderModel.find({}).populate("buyer").populate("products","-photo")
        res.status(201).send({
            success:true,
            message:"all order fetched",
            orders
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            messege:"error in getting all orders",
            error
        })
    }
}

export const changeOrderStatus = async (req,res) =>{
    try {
        const {oid} = req.params
        const {status} = req.body
        
        const orders = await orderModel.findByIdAndUpdate(oid,{status},{new:true})
        res.status(200).send({
            success:true,
            message:"status changed",
            orders

        })
    } catch (error) {
        res.status(500).send({
            success:true,
            message:"something wrong in admin orders",
            error
        })
    }
}
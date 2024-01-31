import express from "express"
import { forgetPasswordController, loginController, registerController, testController, updateProfileController } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
const router = express.Router();
//register user
router.post('/register', registerController)
//login user
router.post('/login',loginController)
//admin access
router.get('/test',requireSignIn,isAdmin, testController)
//checking user loged in or not 
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true})
})

//checking that this req is from admin - admin validation
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true})
})
//forget password
router.post('/forget-password',forgetPasswordController)

//update profile
router.put('/update-profile',requireSignIn,updateProfileController)

export default router;
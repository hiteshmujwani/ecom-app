import express from "express";
import dotenv from "dotenv"
import connectDb from "./database/db.js";
import authRoute from './routes/authRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import productRoute from './routes/productRoute.js'
import cors from 'cors'
const app = express();


//middlewares 
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())


// configuring ENV file 
dotenv.config()

//connecting to database
connectDb();


//routes 
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/category',categoryRoute)
app.use('/api/v1/product',productRoute)
app.get('/',(req,res)=>{
    res.send("hellow from hitesh")
})

const PORT = process.env.PORT || 3030; 
//Listning to the server 
app.listen(PORT,()=>{
    console.log("server running on " + PORT)
})
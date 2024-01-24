import mongoose from "mongoose";

const connectDb = async () =>{
    try {
        const conn = await mongoose.connect(process.env.DB_URI)
        console.log(`connected to database with ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
    }
}

export default connectDb;
import mongoose, { model } from "mongoose";

const orderSchema = new mongoose.Schema({
   products: [{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Products"
   }],
   payment:{},
   buyer:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users"
   },
   status:{
    type:String,
    default:"not confirmed",
    enum:["not confirmed","order Confirmed","shipped","out for delivery","cancel","delivered"]
   }
},{timestamps:true})

export default new mongoose.model("Order",orderSchema);
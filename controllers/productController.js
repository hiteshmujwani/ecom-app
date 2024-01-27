
import slugify from 'slugify'
import productModel from '../models/product.model.js';
import fs from 'fs'
export const createProductController= async(req,res) =>{
  try {
    const {name,slug,description,price,category,quantity,shipping} = req.fields;
    const {photo} = req.files;

    const product = new productModel({...req.fields,slug:slugify(name)});
    
    product.photo.data = fs.readFileSync(photo.path)
    product.photo.contentType = photo.type;
    await product.save()

    res.status(200).send({
        success:true,
        message:"product created successfully",
        product
    })

  } catch (error) {
    console.log(error)
    res.status(402).send({
        success:false,
        error,
        message:"something wrong in createProductController"
    })
  }
}


// updating product 
export const updateProductController = async (req,res) =>{
    try {
        const {name,slug,description,price,category,quantity,shipping} = req.fields;
        const {photo} = req.files;
        
        // const product = await productModel.find({_id:req.params.id});
        // product.photo.data = fs.readFileSync(photo.path)
        // product.photo.contentType = photo.type;

       const updatedProduct = await productModel.findByIdAndUpdate(req.params.id,{...req.fields , slug:slugify(name)},{new:true}).select(-photo).populate("category")
       res.status(200).send({
        success:true,
        message:"product Updated Successfully",
        updatedProduct
       })
    } catch (error) {
        console.log(error)
        res.status(402).send({
            success:false,
            error,
            message:"something Wrong in updateProductController"
        })
    }
}


// getting all the products
export const getAllProductController = async(req,res) =>{
    try {
        const products = await productModel.find({}).populate('category').limit(12).sort({createdAt:-1}).select("-photo")
        res.status(200).send({
            success:true,
            message:'all products',
            products
        })
    } catch (error) {
        console.log(error)
        res.status(402).send({
            success:false,
            error,
            message:"something wrong in getAllproductsController"
        })
    }
}


//getting single product
export const getSingleproductController = async(req,res) =>{
    try {
        const product = await productModel.findOne({slug:req.params.slug}).populate('category').select("-photo")
        res.status(200).send({
            success:true,
            message:'single product',
            product
        })
    } catch (error) {
        console.log(error)
        res.status(402).send({
            success:false,
            error,
            message:"something wrong in getsingleproductController"
        })
    }
}

//delete product
export const deleteProductController = async(req,res) =>{
    try {
        const product = await productModel.findByIdAndDelete(req.params.id)
        res.status(200).send({
            success:true,
            message:'product deleted',
            product
        })
    } catch (error) {
        console.log(error)
        res.status(402).send({
            success:false,
            error,
            message:"something wrong in deleteProductController"
        })
    }
}

//get photo of product
export const getPhotoController = async(req,res) =>{
    try {
        const product = await productModel.findById(req.params.id).select("photo")
        if(product.photo.data){
            res.set("contentType",product.photo.contentType)
        }
        res.status(200).send(
          product.photo.data)
    } catch (error) {
        console.log(error)
        res.status(402).send({
            success:false,
            error,
            message:"something wrong in getPhotoController"
        })
    }
}
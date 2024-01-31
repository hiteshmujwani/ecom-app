
import slugify from 'slugify'
import productModel from '../models/product.model.js';
import fs from 'fs'
import categoryModel from '../models/category.model.js';
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


export const filterProductController = async (req,res) =>{
   try {
    const {checked,radio} = req.body;
   
    let args = {}
    if(checked.length > 0) args.category = checked;
    if(radio.length) args.price = {$gte:radio};
     const products = await productModel.find(args)
     res.status(200).send({
        success:true,
        message:"filter complete",
        products
     })
   } catch (error) {
    console.log(error)
   }
}   

export const totalProductController = async (req,res) =>{
    try {
        const total = await productModel.estimatedDocumentCount();
        res.status(200).send({
            success:true,
            total
        })
    } catch (error) {
        console.log(error)
    }
}


export const moreProductController = async(req,res) =>{
    const page = req.params.page ? req.params.page : 1;
    const perPage = 4

    const products = await productModel.find({}).select("-photo").skip((page-1)*perPage).limit(perPage)
    res.status(200).send({
        success:true,
        products
    })
}


export const searchProductController = async (req,res) =>{
    try {
        const {keyword} = req.params
        const results = await productModel.find({name:keyword}).select('-photo')
        res.status(200).send(results)
    } catch (error) {
        console.log(error)
        res.status(404).send({
            success:false,
            messege:"error in searching product",
            error
        })
    }
}

export const getCategoryProductController = async (req,res)=>{
    try {
        const {slug} = req.params
    const category = await categoryModel.find({slug});
    const product = await productModel.find({category})
    res.status(200).send({
        success:true,
        message:"sored",
        product
    })
    } catch (error) {
        res.status(403).send({
            error
        })
    }
    
}



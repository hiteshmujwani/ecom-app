import express from 'express'
import {requireSignIn , isAdmin} from '../middlewares/authMiddleware.js'
import formidable from 'express-formidable'
import {createProductController ,updateProductController , getAllProductController, getSingleproductController, deleteProductController,getPhotoController, filterProductController, totalProductController, moreProductController} from '../controllers/productController.js';
const router = express.Router();

//creating new product --- admin
router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController)
// updating product -- admin
router.put('/update-product/:id',requireSignIn,isAdmin,formidable(),updateProductController)
//get all products
router.get('/get-all-products',getAllProductController)
//get single product
router.get('/get-product/:slug',getSingleproductController)
//delete product 
router.delete('/delete-product/:id',deleteProductController)

//get photo of product
router.get('/product-photo/:id',getPhotoController)


//for filtering product
router.post('/filter-product',filterProductController)

router.get('/product-total',totalProductController)

router.get('/more-product/:page',moreProductController)
export default router
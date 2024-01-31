import express from 'express'
import {requireSignIn , isAdmin} from '../middlewares/authMiddleware.js'
import formidable from 'express-formidable'
import {createProductController ,updateProductController , getAllProductController, getSingleproductController, deleteProductController,getPhotoController, filterProductController, totalProductController, moreProductController, searchProductController, getCategoryProductController, braintreeTokenController, braintreePaymentController} from '../controllers/productController.js';
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
//getting all products total
router.get('/product-total',totalProductController)

//rendring more products - pagination
router.get('/more-product/:page',moreProductController)

//getting products based on search
router.get('/search/:keyword',searchProductController)

//
router.get('/category-product/:slug',getCategoryProductController)


//payment 
//token 
router.get('/braintree/token',braintreeTokenController)

//payment
router.post('/braintree/payment',requireSignIn,braintreePaymentController)

export default router
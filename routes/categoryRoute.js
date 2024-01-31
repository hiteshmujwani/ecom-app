import express from 'express'
import { createCategoryController ,updateCategoryController ,getAllCategoryController, singleCategoryController ,deleteCategoryController} from '../controllers/categoryController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
const router = express.Router()



//route for new category
router.post('/create-category',requireSignIn,isAdmin,createCategoryController)

// route for updating category
router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController)

//getting all categories
router.get('/all-categories',getAllCategoryController)  // requiresignin and isadmin middleware removed from here

//getting single category
router.get('/single-category/:slug',requireSignIn,isAdmin,singleCategoryController)

//delete category
router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCategoryController)
export default router
import categoryModel from "../models/category.model.js";
import slugify from "slugify";

// Creating new Category
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(500).send({
        success: false,
        message: "please enter category name",
      });
    }
    // checking Category already exist or not
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "category is already registered",
      });
    }
    //creating category
    const category = await categoryModel({ name, slug: slugify(name) }).save();
    res.status(201).send({
      success: true,
      message: "new category created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(402).send({
      success: false,
      error,
      message: "error in create category controller",
    });
  }
};

//updating category
export const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "Category not Updated",
      });
    }
    const update = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    return res.status(201).send({
      success: true,
      message: "Category Updated Successfully",
      update,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "something wrong in updateCategoryController",
      error,
    });
  }
};

//getting all categories
export const getAllCategoryController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    return res.status(200).send({
      success: true,
      message: "all Categories",
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "something wrong in getAllCategoryController",
    });
  }
};

//getting single category
export const singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    return res.status(200).send({
      success: true,
      message: "single category",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "something wrong in singleCategoryController",
    });
  }
};

//delete category
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.findByIdAndDelete(id);
    return res.status(200).send({
      success: true,
      message: "category deleted successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "something wrong in deleteCategoryController",
    });
  }
};

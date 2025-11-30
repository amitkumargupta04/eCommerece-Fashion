import { Category } from "../models/categoryModel.js";


export const categoryCreate = async (req, res) =>{
    try{
        const {name, subcategories} = req.body;
        if(!name){
            return res.status(400).json({
                success: false,
                message: "Category requireds"
            })
        }
        const categoryExists = await Category.findOne({name});
        if(categoryExists){
            return res.status(400).json({
                success: false,
                message: "Category Already created"
            })
        }
        const category = await Category.create({
            name,
            subcategories: subcategories || []
        })
        return res.status(201).json({
            success: true,
            message: "category created successfull",
            category
        })
    }catch(error){
        console.log("Category creating error", error);
        return res.status(500).json({
            success: false,
            message: "Error in category creating"
        })
    }
}

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({
      success: true,
      categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

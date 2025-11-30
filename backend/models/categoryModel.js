import mongoose from "mongoose";    

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },    // Men, Women, Kids, Footwear
  subcategories: [{ type: String }]                        // ["T-Shirt", "Jeans"]
}, { timestamps: true });

export const Category = mongoose.model("Category", categorySchema);
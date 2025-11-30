import mongoose from "mongoose";
import { Category } from "./categoryModel.js";

const productSchema = new mongoose.Schema(
  {
    // 🔹 Basic Details
    name: { type: String, required: true },
    brand: { type: String },
    description: { type: String },

    // 🔹 Pricing
    price: { type: Number, required: true },
    discountPrice: { type: Number }, // optional

    // 🔹 Images (Multiple)
    images: [{ type: String }], // Cloudinary URLs or local paths

    // 🔹 Colors & Sizes
    colors: [{ type: String }], // ["Black", "Blue"]
    sizes: [{ type: String }], // ["S", "M", "L", "XL"]

    // 🔹 Category → Reference to categories table
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    // 🔹 Subcategory → taken from category.subcategories array
    subcategory: {
      type: String,
      required: false,
    },

    // 🔹 Stock
    stock: {
      type: Number,
      default: 0,
    },

    // 🔹 For future (optional)
    //   rating: { type: Number, default: 0 },
    //   totalReviews: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);

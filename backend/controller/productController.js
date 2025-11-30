import { Category } from "../models/categoryModel.js";
import { Product } from "../models/productModel.js";

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      brand,
      description,
      price,
      discountPrice,
      category,
      subcategory,
      stock,
      images,
      colors,
      sizes,
    } = req.body;

    // category validations
    const categoryDoc = await Category.findById(category);
    if (!categoryDoc) {
      return res.status(400).json({
        success: false,
        message: "Invalid Category",
      });
    }
    // // Subcategory validation
    // if (subcategory && !categoryDoc.subcategories.includes(subcategory)) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Invalid subcategory" });
    // }
    const product = await Product.create({
      name,
      brand,
      description,
      price,
      discountPrice,
      category,
      subcategory,
      stock,
      images,
      colors,
      sizes,
    });
    res.status(201).json({
      success: true,
      message: "Product created successfull",
      product,
    });
  } catch (error) {
    console.log("Error in products creating", error);
    return res.status(500).json({
      success: false,
      message: "Error in products creating",
    });
  }
};

// User + Admin
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category")
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      total: products.length,
      products,
    });
  } catch (error) {
    console.log("Error in Fetching totals Products", error);
    return res.status(500).json({
      success: false,
      message: "Errors in fetching all products",
    });
  }
};

// User + Admin
export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id).populate("category");
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log("error in fetcing products by id", error);
    return res.status(500).json({
      success: false,
      message: "Errors in fetching all productsbyID",
    });
  }
};

// admin only update
// export const updateProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }
//     const {
//       name,
//       brand,
//       description,
//       price,
//       discountPrice,
//       category,
//       subcategory,
//       stock,
//       images,
//       colors,
//       sizes,
//     } = req.body;
//     if (category) {
//       const categoryDoc = await Category.findById(category);
//       if (!categoryDoc)
//         return res
//           .status(400)
//           .json({ success: false, message: "Invalid category" });
//       if (subcategory && !categoryDoc.subcategories.includes(subcategory)) {
//         return res
//           .status(400)
//           .json({ success: false, message: "Invalid subcategory" });
//       }
//       product.category = category;
//     }
//     if (name) product.name = name;
//     if (brand) product.brand = brand;
//     if (description) product.description = description;
//     if (price) product.price = price;
//     if (discountPrice) product.discountPrice = discountPrice;
//     if (stock) product.stock = stock;
//     if (images) product.images = images;
//     if (colors) product.colors = colors;
//     if (sizes) product.sizes = sizes;
//     await product.save();
//     res.json({ success: true, message: "Product update succesfull", product });
//   } catch (error) {
//     console.log("Error in updating products", error);
//     return res.status(500).json({
//       success: false,
//       message: "Errors in updating products",
//     });
//   }
// };
export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const {
      name,
      brand,
      description,
      price,
      discountPrice,
      category,
      subcategory,
      stock,
      images,
      colors,
      sizes,
    } = req.body;

    let updateData = {};

    // If category is updated → validate
    if (category) {
      const categoryDoc = await Category.findById(category);
      if (!categoryDoc) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid category" });
      }

      // If subcategory is also updated → validate subcategory belongs to category
      if (subcategory && !categoryDoc.subcategories.includes(subcategory)) {
        return res.status(400).json({
          success: false,
          message: "Invalid subcategory for this category",
        });
      }

      updateData.category = category;
    }

    // If subcategory updated but category NOT updated → validate with existing category
    if (!category && subcategory) {
      const existingProduct = await Product.findById(productId).populate(
        "category"
      );

      if (!existingProduct.category.subcategories.includes(subcategory)) {
        return res.status(400).json({
          success: false,
          message: "Invalid subcategory for the existing category",
        });
      }

      updateData.subcategory = subcategory;
    }

    // Add other optional fields
    if (name !== undefined) updateData.name = name;
    if (brand !== undefined) updateData.brand = brand;
    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = price;
    if (discountPrice !== undefined) updateData.discountPrice = discountPrice;
    if (stock !== undefined) updateData.stock = stock;
    if (images !== undefined) updateData.images = images;
    if (colors !== undefined) updateData.colors = colors;
    if (sizes !== undefined) updateData.sizes = sizes;
    if (subcategory !== undefined) updateData.subcategory = subcategory;

    // Final update
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true } // return updated document
    ).populate("category");

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.log("Error updating product", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating product",
    });
  }
};

//admin
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Produc not found",
      });
    }
    res.status(201).json({
      success: true,
      message: "Product Deleted successfull",
      product,
    });
  } catch (error) {
    console.log("Error in deleting Product", error);
    return res.status(500).json({
      success: false,
      message: "Error in deleteing products",
    });
  }
};

// export const filterProduct = async (req, res) => {
//   try {
//     const { category, subcategory, minPrice, maxPrice, colors, sizes, search } = req.query;

//     let filter = {};

//     // Category
//     if (category) {
//       filter.category = category;
//     }

//     // Subcategory
//     if (subcategory) {
//       filter.subcategory = subcategory;
//     }

//     // Price Range
//     if (minPrice || maxPrice) {
//       filter.price = {};
//       if (minPrice) filter.price.$gte = Number(minPrice);
//       if (maxPrice) filter.price.$lte = Number(maxPrice);
//     }

//     // Color Filter
//     if (colors) {
//       filter.colors = { $in: colors.split(",") };
//     }

//     // Size Filter
//     if (sizes) {
//       filter.sizes = { $in: sizes.split(",") };
//     }

//     // Search Filter
//     if (search) {
//       filter.$or = [
//         { name: { $regex: search, $options: "i" } },
//         { brand: { $regex: search, $options: "i" } },
//         { description: { $regex: search, $options: "i" } }
//       ];
//     }

//     const products = await Product.find(filter).populate("category");

//     return res.json({
//       success: true,
//       total: products.length,
//       products,
//     });

//   } catch (error) {
//     console.log("Error in filter product", error);
//     res.status(500).json({
//       success: false,
//       message: "Error in filter products",
//     });
//   }
// };

export const filterProduct = async (req, res) => {
  try {
    const {
      category,
      subcategory,
      minPrice,
      maxPrice,
      colors,
      sizes,
      search,
      page,
      limit,
      sort,
    } = req.query; // GET request me query params se le rahe

    let filter = {};

    // Category filter
    if (category) filter.category = category;

    // Subcategory filter
    if (subcategory) filter.subcategory = subcategory;

    // Price filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Colors filter
    if (colors) filter.colors = { $in: colors.split(",") };

    // Sizes filter
    if (sizes) filter.sizes = { $in: sizes.split(",") };

    // Search filter (name / brand / description)
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Pagination
    const pageNumber = Number(page) || 1;
    const pageSize = Number(limit) || 12;
    const skip = (pageNumber - 1) * pageSize;

    // Sorting
    let sortOption = {};
    if (sort === "price_asc") sortOption.price = 1;
    else if (sort === "price_desc") sortOption.price = -1;
    else if (sort === "newest") sortOption.createdAt = -1;

    // Query database
    const products = await Product.find(filter)
      .populate("category")
      .sort(sortOption)
      .skip(skip)
      .limit(pageSize);

    const totalProducts = await Product.countDocuments(filter);

    return res.json({
      success: true,
      page: pageNumber,
      totalPages: Math.ceil(totalProducts / pageSize),
      totalProducts,
      products,
    });
  } catch (error) {
    console.log("Error in filter product", error);
    res.status(500).json({
      success: false,
      message: "Error in filter products",
    });
  }
};

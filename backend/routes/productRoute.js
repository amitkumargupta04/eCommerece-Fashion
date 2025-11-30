import express from "express";
import { isAdmin, isAuthenticated } from "../middleware/authMiddleware.js";
import { createProduct, deleteProduct, getProductById, getAllProducts, updateProduct, filterProduct } from "../controller/productController.js";

const router = express.Router();

//admin
router.post("/create", isAuthenticated, isAdmin, createProduct);
router.put("/update/:id", isAuthenticated, isAdmin, updateProduct);
router.delete("/delete/:id", isAuthenticated, isAdmin, deleteProduct)

//public
router.get("/all", getAllProducts)
//Filter
router.get("/filter", filterProduct);
router.get("/:id", getProductById)



export default router;
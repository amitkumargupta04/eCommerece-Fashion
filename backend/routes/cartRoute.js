import express from "express"
import { isAuthenticated } from "../middleware/authMiddleware.js";
import { addToCart, clearCart, getCart, removeCartItem, updateCartItem } from "../controller/cartController.js";

const router = express.Router();

router.post("/add", isAuthenticated, addToCart)
router.get("/all", isAuthenticated, getCart);
router.put("/update/:productId", isAuthenticated, updateCartItem);
router.delete("/remove/:productId", isAuthenticated, removeCartItem);
router.delete("/clear", isAuthenticated, clearCart);


export default router;
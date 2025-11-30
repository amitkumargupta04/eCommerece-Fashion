import express from "express";

import { isAdmin, isAuthenticated } from "../middleware/authMiddleware.js";
import { approveReturn, buyNow, cancelOrder, getAllOrders, getOrderDetals, getUserAllOrders, placeOrder, rejectReturn, returnOrder, updateOrderStatus } from "../controller/orderController.js";

const router = express.Router();

router.post("/buy-now", isAuthenticated, buyNow);
router.post("/place-order", isAuthenticated, placeOrder);
router.get("/user-orders", isAuthenticated, getUserAllOrders);
router.get("/all", isAuthenticated, isAdmin, getAllOrders); // admin
router.put("/update-status/:id", isAuthenticated, isAdmin, updateOrderStatus); // admin
router.put("/cancel-order/:id", isAuthenticated, cancelOrder); // user
router.get("/order-details/:id", isAuthenticated, getOrderDetals); // user
router.put("/order-return/:id", isAuthenticated, returnOrder); // user
router.put("/approve-return/:id", isAuthenticated, isAdmin, approveReturn); // admin
router.put("/reject-return/:id", isAuthenticated, isAdmin, rejectReturn); // admin



export default router;
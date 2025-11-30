import express from "express";
import { isAdmin, isAuthenticated } from "../middleware/authMiddleware.js";
import { categoryCreate, getAllCategories } from "../controller/categoryController.js";


const router = express.Router();

router.post("/create", isAuthenticated, isAdmin, categoryCreate);
router.get("/all", getAllCategories)

export default router;
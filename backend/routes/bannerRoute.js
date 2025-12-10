import express from 'express';
import { createBanner, deleteBanner, getBanners, updateBanner } from '../controller/bannerController.js';
import { isAdmin, isAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/create", isAuthenticated, isAdmin, createBanner);
router.get("/get", getBanners);
router.put("/update/:id", isAuthenticated, isAdmin, updateBanner);
router.delete("/delete/:id", isAuthenticated, isAdmin, deleteBanner);

export default router;
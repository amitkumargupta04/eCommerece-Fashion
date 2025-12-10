import express from "express";
import { getUserProfile, loginUser, logoutUser, signupUser, updateUserProfile } from "../controller/authController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", isAuthenticated, getUserProfile);
router.put("/update-profile", isAuthenticated, updateUserProfile);

export default router;
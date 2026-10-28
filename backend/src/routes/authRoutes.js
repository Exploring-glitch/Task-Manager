import express from "express";
import {
    getUserProfile,
    updateUserProfile,
    uploadProfileImage,
    userLogin,
    userLogout,
    userSignup,
} from "../controller/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { authRateLimiter, uploadRateLimiter } from "../middleware/rateLimitMiddleware.js";
import { uploadMiddleware } from "../middleware/uploadMiddleware.js";

const authRouter = express.Router();

authRouter.post("/signup", authRateLimiter, userSignup);
authRouter.post("/login", authRateLimiter, userLogin);
authRouter.post("/logout", userLogout);

authRouter.get("/profile", authMiddleware, getUserProfile);
authRouter.put("/profile", authMiddleware, updateUserProfile);

// Uploading requires an account so the Cloudinary bucket cannot be used as a
// free image host by anonymous visitors.
authRouter.post(
    "/upload-image",
    authMiddleware,
    uploadRateLimiter,
    uploadMiddleware.single("image"),
    uploadProfileImage
);

export default authRouter;

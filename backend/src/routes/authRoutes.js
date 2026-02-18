import express from "express";
import { getUserProfile, updateUserProfile, uploadProfileImage, userLogin, userLogout, userSignup } from "../controller/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { uploadMiddleware } from "../middleware/uploadMiddleware.js";
const authRouter = express.Router();

authRouter.post("/signup", userSignup)
authRouter.post("/login", userLogin)
authRouter.post("/logout", userLogout)
authRouter.get("/profile", authMiddleware, getUserProfile)
authRouter.put("/profile", authMiddleware, updateUserProfile)
authRouter.post("/upload-image", uploadMiddleware.single("image"), uploadProfileImage)


export default authRouter;
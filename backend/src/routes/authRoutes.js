import express from "express";
import { getUserProfile, updateUserProfile, userLogin, userLogout, userSignup } from "../controller/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const authRouter = express.Router();

authRouter.post("/signup", userSignup)
authRouter.post("/login", userLogin)
authRouter.post("/logout", userLogout)
authRouter.get("/profile", authMiddleware, getUserProfile)
authRouter.put("/profile", authMiddleware, updateUserProfile)

export default authRouter;
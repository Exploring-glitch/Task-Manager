import express from "express";
import { getUserProfile, updateUserProfile, userLogin, userLogout, userSignup } from "../controller/authController.js";
const authRouter = express.Router();

authRouter.post("/signup", userSignup)
authRouter.post("/login", userLogin)
authRouter.post("/logout", userLogout)
authRouter.get("/profile", protect, getUserProfile)
authRouter.put("/profile", protect, updateUserProfile)

export default authRouter;
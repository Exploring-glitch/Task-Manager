import express from 'express';
const userRouter = express.Router();
import { adminOnly, authMiddleware } from "../middleware/authMiddleware.js";
import { getAllUsers, getUserById } from '../controller/userController.js';



userRouter.get("/",authMiddleware ,adminOnly, getAllUsers) //get all members (access: admin only)

userRouter.get("/:id", authMiddleware , getUserById) //get a specific user







export default userRouter;
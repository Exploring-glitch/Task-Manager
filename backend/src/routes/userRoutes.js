import express from 'express';
const userRouter = express.Router();
import { adminOnly, authMiddleware } from "../middleware/authMiddleware.js";
import { deleteUser, getAllUsers } from '../controller/adminController.js';



userRouter.get("/",authMiddleware ,adminOnly, getAllUsers) //get all users (admin only)

userRouter.delete("/delete-user",authMiddleware ,adminOnly, deleteUser) //delete user (admin only)

userRouter.get("/getUser", authMiddleware , getUserById) //get a specific user







export default userRouter;
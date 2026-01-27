import express from 'express';
const userRouter = express.Router();
import { adminOnly, authMiddleware } from "../middleware/authMiddleware.js";
import { deleteUser, getAllUsers, getUserById } from '../controller/userController.js';



userRouter.get("/",authMiddleware ,adminOnly, getAllUsers) //get all members (access: admin only)

userRouter.delete("/delete-user",authMiddleware ,adminOnly, deleteUser) //delete member (access: admin only)

userRouter.get("/get-user", authMiddleware , getUserById) //get a specific user







export default userRouter;
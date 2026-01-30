import express from 'express';
import { adminOnly, authMiddleware } from '../middleware/authMiddleware.js';
import { createTask, deleteTaskById, getDashboardData, getTaskById, getTasks, getUserDashboardData, updateTaskById, updateTaskChecklist, updateTaskStatusById } from '../controller/taskController.js';
const taskRouter = express.Router();


taskRouter.get("/dashboard",authMiddleware, adminOnly, getDashboardData) //access: admin 
taskRouter.get("/dashboard-user-data", authMiddleware, getUserDashboardData)

taskRouter.get("/", authMiddleware, getTasks) //get all the tasks. //access: admin, member(only assigned task)
taskRouter.get("/:id", authMiddleware, getTaskById)

taskRouter.post("/create-task", authMiddleware, adminOnly, createTask) //access: admin
taskRouter.delete("/delete-task/:id",authMiddleware, adminOnly, deleteTaskById) //access: admin

taskRouter.put("/update-task/:id", authMiddleware, updateTaskById)
taskRouter.put("/update-task-status/:id", authMiddleware, updateTaskStatusById)
taskRouter.put("/update-task-todo/:id", authMiddleware, updateTaskChecklist)





export default taskRouter;
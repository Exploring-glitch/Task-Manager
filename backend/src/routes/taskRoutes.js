import express from "express";
import { adminOnly, authMiddleware } from "../middleware/authMiddleware.js";
import {
    createTask,
    deleteTaskById,
    getDashboardData,
    getTaskById,
    getTasks,
    getUserDashboardData,
    updateTaskById,
    updateTaskChecklist,
    updateTaskStatusById,
} from "../controller/taskController.js";

const taskRouter = express.Router();

taskRouter.get("/dashboard", authMiddleware, adminOnly, getDashboardData); // access: admin
taskRouter.get("/dashboard-user-data", authMiddleware, getUserDashboardData); // access: logged-in members

taskRouter.get("/", authMiddleware, getTasks); // access: admin (all), member (assigned only)
taskRouter.get("/:id", authMiddleware, getTaskById);

taskRouter.post("/create-task", authMiddleware, adminOnly, createTask); // access: admin
taskRouter.delete("/delete-task/:id", authMiddleware, adminOnly, deleteTaskById); // access: admin

// Full task edits are an admin operation. Members can only change the status
// and the checklist of tasks assigned to them.
taskRouter.put("/update-task/:id", authMiddleware, adminOnly, updateTaskById);
taskRouter.put("/update-task-status/:id", authMiddleware, updateTaskStatusById);
taskRouter.put("/update-task-todo/:id", authMiddleware, updateTaskChecklist);

export default taskRouter;

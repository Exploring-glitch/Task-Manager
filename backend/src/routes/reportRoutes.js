import express from "express";
import { adminOnly, authMiddleware } from "../middleware/authMiddleware.js";
import { exportTasksReport, exportUsersReport } from "../controller/reportController.js";
const reportRouter = express.Router();


reportRouter.get("/exports/tasks", authMiddleware, adminOnly, exportTasksReport) //export all tasks as excel/pdf. access: admin
reportRouter.get("/export/users", authMiddleware, adminOnly, exportUsersReport) //export all user-task report. access: admin


export default reportRouter;
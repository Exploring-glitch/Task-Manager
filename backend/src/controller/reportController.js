import User from "../models/userSchema.js";
import Task from "../models/taskSchema.js";
import excelJs from "exceljs";

export const exportTasksReport = async(req,res) => {
    try{
        const tasks = await Task.find().populate("assignedTo", "name email");

        const workBook = new excelJs.Workbook();
        const workSheet = workBook.addWorksheet("Task Report");
        workSheet.columns = [
            {header : "Task Id", key : "._id", width : 25},
            {header : "Title", key : "title", width : 30},
            {header : "Description", key : "description", width : 50},
            {header : "Priority", key : "priority", width : 15},
            {header : "Status", key : "status", width : 20},
            {header : "Due Date", key : "dueDate", width : 20},
            {header : "Assigned To", key : "assignedTo", width : 30}

        ]
        tasks.forEach((task) => {
            const assignedTo = task.assignedTo
                .map((user) => `${user.name} (${user.email})`)
                .join(", ");
            workSheet.addRow({
                _id : task._id,
                title : task.title,
                description : task.description,
                priority : task.priority,
                status: task.status,
                dueDate : task.dueDate.toISOString().split("T")[0],
                assignedTo : assignedTo || "Unassigned",
            });
        });
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            'attachment; filename="tasks_report.xlsx"'
        );

        return workBook.xlsx.write(res).then(() =>{
            res.end();
        });
    }
    catch(error){
        resizeBy.status(500).json({ "message": "Error exporting tasks", "error": error.message })
    }
}

export const exportUsersReport = async() =>{
    try{

    }
    catch(error){
        resizeBy.status(500).json({ "message": "Error exporting tasks", "error": error.message})
    }
}
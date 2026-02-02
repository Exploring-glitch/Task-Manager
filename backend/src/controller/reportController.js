import User from "../models/userSchema.js";
import Task from "../models/taskSchema.js";
import excelJs from "exceljs";

export const exportTasksReport = async(req,res) => {
    try{
        const tasks = await Task.find().populate("assignedTo", "name email"); //populate: replaces the user ids with name,email in assignedTo 

        const workBook = new excelJs.Workbook(); //creates a new excel file
        const workSheet = workBook.addWorksheet("Task Report"); //adds a sheet inside the workbook named Task Report
        workSheet.columns = [ //defines the column names //header: title of the column, Key: field name used while adding rows
            {header : "Task Id", key : "_id", width : 25}, 
            {header : "Title", key : "title", width : 30},
            {header : "Description", key : "description", width : 50},
            {header : "Priority", key : "priority", width : 15},
            {header : "Status", key : "status", width : 20},
            {header : "Due Date", key : "dueDate", width : 20},
            {header : "Assigned To", key : "assignedTo", width : 30}

        ]
        tasks.forEach((task) => {
            const assignedTo = task.assignedTo
                .map((user) => `${user.name} ( ${user.email} )`) //example- sreeja (sreejahere@gmail.com)
                .join(", "); //example- sreeja (sreejahere@gmail.com), yash (yashhere@gmail.com, ...)

            workSheet.addRow({ //add one row per task using key (defined in columns)
                _id : task._id,
                title : task.title,
                description : task.description,
                priority : task.priority,
                status: task.status,
                dueDate : task.dueDate.toISOString().split("T")[0], //example- coverts 2026-01-30T00:00:00.000Z to 2026-01-30
                assignedTo : assignedTo || "Unassigned",
            });
        });
        res.setHeader( //tells the browser that it is an excel file
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader( //to download and set the file name
            "Content-Disposition",
            'attachment; filename="tasks_report.xlsx"'
        );

        return workBook.xlsx.write(res).then(() =>{
            res.end();
        });
    }
    catch(error){
        res.status(500).json({ "message": "Error exporting tasks", "error": error.message })
    }
}

export const exportUsersReport = async(req, res) =>{
    try{
        const users = await User.find().select("name email _id").lean();
        const userTasks = await Task.findOne().populate( "assignedTo", "name email _id" );
        const userTaskMap = {};
        users.forEach((user) =>{ 
            userTaskMap[user._id] = {
                name: user.name,
                email: user.email,
                tasKCount: 0,
                pendingTasks: 0,
                inProgressTasks: 0,
                completedTasks: 0,
            };
        });
        userTasks.forEach((task) => {
            if(task.assignedTo){
                task.assignedTo.forEach((assignedUser) => {

                    if(userTaskMap[assignedUser._id]){
                        userTaskMap[assignedUser._id].tasKCount += 1;

                        if(task.status === "Pending"){
                            userTaskMap[assignedUser._id].pendingTasks += 1;
                        } 
                        else if(task.status === "In Progress"){
                            userTaskMap[assignedUser._id].inProgressTasks += 1;
                        } 
                        else if(task.status === "Completed"){
                            userTaskMap[assignedUser._id].completedTasks += 1;
                        }
                    }
                });
            }
        });

        const workBook = new excelJs.Workbook();
        const workSheet = workBook.addWorksheet("User Tasks Report");
        workSheet.columns = [
            {header: "User Name", key: "name", width: 30},
            {header: "Email", key: "email", width: 40},
            {header: "Total Assigned Tasks", key: "tasKCount", width: 20},
            {header: "Pending Tasks", key: "pendingTasks", width: 20},
            {header: "In Progress Tasks", key: "inProgressTasks", width: 20},
            {header: "Completed Tasks", key: "completedTasks", width: 20}
        ];
        
        Object.values(userTaskMap).forEach((user) => {
            workSheet.addRow(user);
        });

        res.setHeader( //tells the browser that it is an excel file
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader( //to download and set the file name
            "Content-Disposition",
            'attachment; filename="tasks_report.xlsx"'
        );

        return workBook.xlsx.write(res).then(() =>{
            res.end();
        });
    }
    catch(error){
        res.status(500).json({ "message": "Error exporting tasks", "error": error.message})
    }
}
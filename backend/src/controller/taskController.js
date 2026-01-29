import { allTaskDao, completeTasksDao, createTaskDao, findTaskById, findTaskByIdWithUser, findTasksForAdminDao, findTasksForMemberDao, inProgressTasksDao, pendingTasksDao } from "../dao/taskDao.js";
import Task from "../models/taskSchema.js"

export const createTask = async (req, res) => { //access: admin
    try {
        const { title, description, priority, status, dueDate, assignedTo, attachments, todoCheckLists } = req.body

        if (!Array.isArray(assignedTo)) {
            return res.status(400).json({ "message": "'assignedTo' field must contain an array of user IDs" })
        }

        const task = await createTaskDao(title, description, priority, status, dueDate, assignedTo, attachments, todoCheckLists);

        res.status(200).json({ "message": "Task created successfully", "task": task })
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", "error": error.message });
    }
}
export const updateTaskById = async (req, res) => {
    try {
        const task = await findTaskById(req.params.id);
        if (!task) {
            return res.status(404).json({ "message": "Task not found" })
        }

        if (req.body.title) { task.title = req.body.title }
        if (req.body.description) { task.description = req.body.description }
        if (req.body.priority) { task.priority = req.body.priority }
        if (req.body.dueDate) { task.dueDate = req.body.dueDate }
        if (req.body.todoCheckLists) { task.todoCheckLists = req.body.todoCheckLists }
        if (req.body.attachments) { task.attachments = req.body.attachments }
        if (req.body.assignedTo) {
            if (!Array.isArray(req.body.assignedTo)) {
                return res.status(400).json({ "message": "'assignedTo' field must contain an array of user IDs" })
            }
            task.assignedTo = req.body.assignedTo
        }

        const updatedTask = await task.save();
        res.json({ "message": "Task updated successfully", "task": updatedTask })
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", "error": error.message });
    }
}
export const getTasks = async (req, res) => { //get all tasks. access: admin(all tasks), member(only assigned task))
    try {
        const { status } = req.query;
        let filter = {}
        if (status) {
            filter.status = status
        }


        let tasks;
        if (req.user.role === "admin") {
            tasks = await findTasksForAdminDao(filter)
        }
        else {
            tasks = await findTasksForMemberDao(filter, req.user._id)
        }


        //completed todoCheckList count to each task
        tasks = await Promise.all(
            tasks.map(async (task) => {
                const completedCount = task.todoCheckLists.filter(
                    (item) => item.completed
                ).length
                return { ...task._doc, completedTodoCount: completedCount }
            })
        )
       
        
        //status summary count
        const allTasks = await Task.countDocuments(
            req.user.role === "admin" ? {} : { assignedTo: req.user._id }
        );
        const pendingTasks = await Task.countDocuments({
            ...filter,
            status: "Pending",
            ...(req.user.role != "admin" && { assignedTo: req.user._id })
        })
        const inProgressTasks = await Task.countDocuments({
            ...filter,
            status: "In Progress",
            ...(req.user.role != "admin" && { assignedTo: req.user._id })
        })
        const completedTasks = await Task.countDocuments({
            ...filter,
            status: "Completed",
            ...(req.user.role != "admin" && { assignedTo: req.user._id })
        })

        res.status(200).json({
            "tasks": tasks,
            "statusSummary": {
                "all": allTasks,
                "pending": pendingTasks,
                "inProgress": inProgressTasks,
                "completed": completedTasks
            }
        })

    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", "error": error.message });
    }
}
export const getTaskById = async (req, res) => { //get tsk by id. access: users(admin & member)
    try {
        const task = await findTaskByIdWithUser(req.params.id);
        if(!task){
            res.status(404).json({ "message": "Task not found" })
        }

        res.json(task)
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}



export const deleteTaskById = async (req, res) => { //access: admin 
    try {
        const task = await findTaskById(req.params.id);
        if(!task){
            res.status(404).json({ "message": "Task not found" })
        }

        await task.deleteOne();
        res.status(200).json({ "message": "Task deleted successfully" })
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", "error": error.message });
    }
}

export const updateTaskStatusById = async (req, res) => {
    try {

    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", "error": error.message });
    }
}

export const updateTaskChecklist = async (req, res) => {
    try {

    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", "error": error.message });
    }
}

export const getDashboardData = async (req, res) => { //access: admin
    try {

    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", "error": error.message });
    }
}

export const getUserDashboardData = async (req, res) => {
    try {

    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", "error": error.message });
    }
}

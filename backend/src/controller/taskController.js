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

        if (!task) {
            return res.status(404).json({ "message": "Task not found" })
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
        if (!task) {
            return res.status(404).json({ "message": "Task not found" })
        }

        await task.deleteOne();
        res.status(200).json({ "message": "Task deleted successfully" })
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", "error": error.message });
    }
}
export const updateTaskStatusById = async (req, res) => { //update a task. access: admin(all tasks), member(only assigned task))
    try {
        const task = await findTaskById(req.params.id);
        if (!task) {
            return res.status(404).json({ "message": "Task not found" })
        }


        const isAssigned = task.assignedTo.some( //.some(): checks if current logged-in user is in that array (of assignedTo)
            (userId) => userId.toString() === req.user._id.toString() //if user is a member, it checks if the task is assigned to that member or not
        );
        if (!isAssigned && req.user.role !== "admin") {
            return res.status(403).json({ "message": "Unauthorized" })
        }


        if (req.body.status) { task.status = req.body.status }


        if (task.status === "Completed") { //if status is completed then mark completed as true to all todo checklists
            task.todoCheckLists.forEach((item) => (item.completed = true))
            task.progress = 100;
        }
        else {
            task.todoCheckLists.forEach(item => item.completed = false);
            task.progress = 0;
        }

        await task.save();
        res.status(200).json({ "message": "Task status updated successfully", "task": task })
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", "error": error.message });
    }
}
export const updateTaskChecklist = async (req, res) => {
    try {
        const { todoCheckLists } = req.body;

        const task = await findTaskById(req.params.id);
        if (!task) {
            return res.status(404).json({ "message": "Task not found" })
        }

        if (!task.assignedTo.includes(req.user._id) && req.user.role !== "admin") {
            return res.status(403).json({ "message": "Unauthorized" })
        }

        task.todoCheckLists = todoCheckLists


        //auto generate progress based on checklist completion and mark the status based on the progress 
        const completedTaskcount = task.todoCheckLists.filter(
            (item) => item.completed
        ).length;
        const totalItems = task.todoCheckLists.length

        task.progress = totalItems > 0 ? Math.round((completedTaskcount / totalItems) * 100) : 0

        if (task.progress == 100) {
            task.status = "Completed"
        }
        else if (task.progress > 0) {
            task.status = "In Progress"
        }
        else {
            task.status = "Pending"
        }


        await task.save();
        const updatedTask = await findTaskByIdWithUser(req.params.id);
        res.status(200).json({ "message": "Task updated successfully", "tasks": updatedTask })

    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", "error": error.message });
    }
}
export const getDashboardData = async (req, res) => { //access: admin
    try {
        const totalTask = await Task.countDocuments();
        const pendingTasks = await Task.countDocuments({ "status": "Pending" })
        const inProgressTasks = await Task.countDocuments({ "status": "In Progress" })
        const completedTasks = await Task.countDocuments({ "status": "Completed" })

        //count tasks whose status is not completed and due date is earlier than today.
        const overDueTasks = await Task.countDocuments({
            status: { $ne: "Completed" }, //$ne means not: status not equal to completed
            dueDate: { $lt: new Date() } //$lt means less than: dueDate less than today's date
        });


        //task distribution by status
        const taskStatuses = ["Pending", "In Progress", "Completed"];
        const taskDistributionsRaw = await Task.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                },
            },
        ]);
        const taskDistributions = taskStatuses.reduce((acc, status) => {
            const formattedKey = status.replace(/\s+/g, ""); //to remove spaces from response Key
            acc[formattedKey] = taskDistributionsRaw.find((item) => item._id === status)?.count || 0;
            return acc;
        }, {});
        taskDistributions["All"] = totalTask //add total count to taskDistribution


        //task distribution by priority
        const taskPriorities = ["Low", "Medium", "High"];
        const taskPriorityLevelsRaw = await Task.aggregate([
            {
                $group: {
                    _id: "$priority",
                    count: { $sum: 1 }
                },
            },
        ]);
        const taskPriorityLevels = taskPriorities.reduce((acc, priority) => {
            acc[priority] = taskPriorityLevelsRaw.find((item) => item._id === priority)?.count || 0;
            return acc;
        }, {});


        //fetch recent 10 tasks
        const recentTasks = await Task.find()
            .sort({ createdAt: -1 }) //-1 means descenting order i.e newest tasks first 
            .limit(10) //only 10 tasks
            .select("title status priority dueDate createdAt") //select and return only these fields

        res.status(200).json({
            "statistics": {
                totalTask,
                pendingTasks,
                inProgressTasks,
                completedTasks,
                overDueTasks
            },
            "charts": {
                taskDistributions,
                taskPriorityLevels
            },
            "recentTasks": recentTasks
        });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", "error": error.message });
    }
}
export const getUserDashboardData = async (req, res) => { //access: logged-in users(members)
    try {
        const userId = req.user._id;

        const totalTask = await Task.countDocuments();
        const pendingTasks = await Task.countDocuments({ "assignedTo": userId, "status": "Pending" })
        const inProgressTasks = await Task.countDocuments({ "assignedTo": userId, "status": "In Progress" })
        const completedTasks = await Task.countDocuments({ "assignedTo": userId, "status": "Completed" })

        const overDueTasks = await Task.countDocuments({
            assignedTo: userId,
            status: { $ne: "Completed" },
            dueDate: { $lt: new Date() }
        });


        //Task distribution by status
        const taskStatuses = ["Pending", "In Progress", "Completed"];
        const taskDistributionsRaw = await Task.aggregate([
            { $match: { assignedTo: userId } },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                },
            },
        ]);
        const taskDistributions = taskStatuses.reduce((acc, status) => {
            const formattedKey = status.replace(/\s+/g, ""); //to remove spaces from response Key
            acc[formattedKey] = taskDistributionsRaw.find((item) => item._id === status)?.count || 0;
            return acc;
        }, {});
        taskDistributions["All"] = totalTask //add total count to taskDistribution


        //task distribution by priority
        const taskPriorities = ["Low", "Medium", "High"];
        const taskPriorityLevelsRaw = await Task.aggregate([
            { $match: { assignedTo: userId } },
            {
                $group: {
                    _id: "$priority",
                    count: { $sum: 1 }
                },
            },
        ]);
        const taskPriorityLevels = taskPriorities.reduce((acc, priority) => {
            acc[priority] = taskPriorityLevelsRaw.find((item) => item._id === priority)?.count || 0;
            return acc;
        }, {});


        //fetch recent 10 taska for the logged-in user
        const recentTasks = await Task.find({ "assignedTo" : userId})
            .sort({ createdAt: -1 })
            .limit(10)
            .select("title status priority dueDate createdAt")

        res.status(200).json({
            "statistics": {
                totalTask,
                pendingTasks,
                inProgressTasks,
                completedTasks,
                overDueTasks
            },
            "charts": {
                taskDistributions,
                taskPriorityLevels
            },
            "recentTasks": recentTasks
        });

    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", "error": error.message });
    }
}

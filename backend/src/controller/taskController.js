import { createTaskDao } from "../dao/taskDao.js";


export const getTasks = async(req, res) =>{ //get all tasks. access: admin(all tasks), member(only assigned task))
    try{
        
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", "error": error.message });
    }
}

export const getTaskById = async(req, res) =>{ //get tsk by id. access: users(admin & member)
    try{

    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}



export const createTask = async(req, res) =>{ //access: admin
    try{
        const {title, description, priority, status, dueDate, assignedTo, attachments, todoCheckLists} = req.body

        if(!Array.isArray(assignedTo)){
            return res.status(400).json({ "message": "'assignedTo' field must contain an array of user IDs"})
        }

        const task = await createTaskDao(title, description, priority, status, dueDate, assignedTo, attachments, todoCheckLists);

        res.status(200).json({ "message": "Task created successfully", "task": task})
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", "error": error.message });
    }
}

export const deleteTaskById = async(req, res) =>{ //access: admin 
    try{

    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}



export const updateTaskById = async(req, res) =>{ 
    try{

    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateTaskStatusById = async(req, res) =>{ 
    try{

    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateTaskChecklist = async(req, res) =>{ 
    try{

    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}



export const getDashboardData = async(req, res) =>{ //access: admin
    try{

    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getUserDashboardData = async(req, res) =>{ 
    try{

    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

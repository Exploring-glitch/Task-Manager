

export const getTasks = async(req, res) =>{ //get all tasks. access: admin(all tasks), member(only assigned task))
    try{

    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
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

    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
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

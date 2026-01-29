import Task from "../models/taskSchema.js"


//used in userController.js
export const memberInfo = async (users) => {
    return Promise.all(
        users.map(async (user) => {
            const pendingTasks = await Task.countDocuments({
                assignedTo: user._id,
                status: "Pending"
            });
            const inProgressTask = await Task.countDocuments({
                assignedTo: user._id,
                status: "In progress"
            });
            const completedTask = await Task.countDocuments({
                assignedTo: user._id,
                status: "Completed"
            });

            return {
                ...user._doc, //user data
                pendingTasks,
                inProgressTask,
                completedTask
            }
        })
    )
}

//used in taskController.js
export const createTaskDao = async(title, description, priority, status, dueDate, assignedTo, attachments, todoCheckLists) => {
    const newTask = new Task({
        title: title,
        description: description,
        priority: priority,
        status: status,
        dueDate: dueDate,
        assignedTo: assignedTo,
        attachments: attachments,
        todoCheckLists: todoCheckLists
    })

    await newTask.save();
    return newTask;
}


export const findTaskById = async(id) =>{
    return await Task.findById(id);
}

export const findTaskByIdWithUser = async(id) =>{
    return await Task.findById(id).populate(
        "assignedTo" , 
        "name email profileImageUrl"
    );
}


export const findTasksForAdminDao = async(filter) =>{
    return await Task.find(filter).populate(
        "assignedTo",
        "name email profileImgUrl" 
    )
}
export const findTasksForMemberDao = async(filter, id) =>{
    return await Task.find({ ...filter, assignedTo : id }).populate(
        "assignedTo",
        "name email profileImgUrl" 
    )
}
export const allTaskDao = async(role, id) =>{
    return await Task.countDocuments( 
        role === "admin" ? {} : {assignedTo: id}
    )
}
export const pendingTasksDao = async(filter,role, id) =>{
    return await Task.countDocuments({
        ...filter,
        status: "Pending",
        ...(role != "admin" && {assignedTo: id})
    })
}
export const inProgressTasksDao = async(filter, role, id) =>{
    return await Task.countDocuments({
        ...filter,
        status: "In Progress",
        ...(role != "admin" && {assignedTo: id})
    })
}
export const completeTasksDao = async(filter, role, id) =>{
    return await Task.countDocuments({
        ...filter,
        status: "Completed",
        ...(role != "admin" && {assignedTo: id})
    })
}
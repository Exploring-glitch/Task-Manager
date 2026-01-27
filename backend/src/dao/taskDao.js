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
import Task from "../models/taskSchema.js"

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
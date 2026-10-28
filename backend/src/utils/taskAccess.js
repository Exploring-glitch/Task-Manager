/**
 * Returns true when the given user is allowed to read or mutate the task.
 * Admins can access everything, members only the tasks assigned to them.
 */
export const isTaskAssignedTo = (task, userId) => {
    return (task?.assignedTo || []).some((assignee) => {
        const id = assignee?._id ?? assignee;
        return String(id) === String(userId);
    });
};

export const canAccessTask = (task, user) => {
    if (!task || !user) return false;
    return user.role === "admin" || isTaskAssignedTo(task, user._id);
};

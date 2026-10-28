import mongoose from "mongoose";
import Task from "../models/taskSchema.js";

const TASK_POPULATE_FIELDS = "name email profileImageUrl";

export const createTaskDao = (taskData) => {
    return Task.create(taskData);
};

export const findTaskById = (id) => {
    return Task.findById(id);
};

export const findTaskByIdWithUser = (id) => {
    return Task.findById(id).populate("assignedTo", TASK_POPULATE_FIELDS);
};

/**
 * Returns the tasks visible to the given user: everything for admins, only the
 * assigned tasks for members.
 */
export const findTasks = ({ filter = {}, userId } = {}) => {
    const query = userId ? { ...filter, assignedTo: userId } : filter;

    return Task.find(query).populate("assignedTo", TASK_POPULATE_FIELDS).sort({ createdAt: -1 });
};

export const deleteTaskById = (id) => {
    return Task.findByIdAndDelete(id);
};

export const toObjectId = (id) => {
    if (id instanceof mongoose.Types.ObjectId) return id;
    return new mongoose.Types.ObjectId(String(id));
};

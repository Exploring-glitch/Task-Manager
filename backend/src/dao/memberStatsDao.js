import Task from "../models/taskSchema.js";
import { toObjectId } from "./taskDao.js";

/**
 * Returns a Map of userId -> { pendingTask, inProgressTask, completedTask }
 * calculated with a single aggregation instead of three queries per member.
 */
export const getMemberTaskCounts = async (userIds) => {
    const ids = userIds.map((id) => toObjectId(id));

    const rows = await Task.aggregate([
        { $match: { assignedTo: { $in: ids } } },
        { $unwind: "$assignedTo" },
        { $match: { assignedTo: { $in: ids } } },
        { $group: { _id: { user: "$assignedTo", status: "$status" }, count: { $sum: 1 } } },
    ]);

    const counts = new Map();

    rows.forEach(({ _id, count }) => {
        const key = String(_id.user);
        const entry = counts.get(key) || {
            pendingTask: 0,
            inProgressTask: 0,
            completedTask: 0,
        };

        if (_id.status === "Pending") entry.pendingTask += count;
        if (_id.status === "In Progress") entry.inProgressTask += count;
        if (_id.status === "Completed") entry.completedTask += count;

        counts.set(key, entry);
    });

    return counts;
};

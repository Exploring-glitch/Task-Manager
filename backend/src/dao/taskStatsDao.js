import Task from "../models/taskSchema.js";
import { toObjectId } from "./taskDao.js";

const STATUSES = ["Pending", "In Progress", "Completed"];
const PRIORITIES = ["Low", "Medium", "High"];

const RECENT_TASK_FIELDS = {
    title: 1,
    status: 1,
    priority: 1,
    dueDate: 1,
    createdAt: 1,
};

/**
 * Counts tasks per status using a single aggregation.
 */
export const countTasksByStatus = async (filter = {}) => {
    const rows = await Task.aggregate([
        { $match: filter },
        { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const counts = { Pending: 0, "In Progress": 0, Completed: 0 };

    rows.forEach((row) => {
        if (row._id in counts) counts[row._id] = row.count;
    });

    return counts;
};

export const getStatusSummary = async (userId) => {
    const filter = userId ? { assignedTo: toObjectId(userId) } : {};
    const counts = await countTasksByStatus(filter);

    return {
        all: counts.Pending + counts["In Progress"] + counts.Completed,
        pending: counts.Pending,
        inProgress: counts["In Progress"],
        completed: counts.Completed,
    };
};

/**
 * Everything the dashboards need in one round trip.
 * `userId` narrows the data down to a single member.
 */
export const getDashboardStats = async (userId) => {
    const match = userId ? { assignedTo: toObjectId(userId) } : {};

    const [result] = await Task.aggregate([
        { $match: match },
        {
            $facet: {
                byStatus: [{ $group: { _id: "$status", count: { $sum: 1 } } }],
                byPriority: [{ $group: { _id: "$priority", count: { $sum: 1 } } }],
                overdue: [
                    { $match: { status: { $ne: "Completed" }, dueDate: { $lt: new Date() } } },
                    { $count: "count" },
                ],
                total: [{ $count: "count" }],
                recent: [
                    { $sort: { createdAt: -1 } },
                    { $limit: 10 },
                    { $project: RECENT_TASK_FIELDS },
                ],
            },
        },
    ]);

    const statusCounts = { Pending: 0, "In Progress": 0, Completed: 0 };
    (result?.byStatus || []).forEach((row) => {
        if (row._id in statusCounts) statusCounts[row._id] = row.count;
    });

    const priorityCounts = { Low: 0, Medium: 0, High: 0 };
    (result?.byPriority || []).forEach((row) => {
        if (row._id in priorityCounts) priorityCounts[row._id] = row.count;
    });

    const totalTask = result?.total?.[0]?.count || 0;

    // Keys without spaces are what the frontend charts expect.
    const taskDistributions = {
        Pending: statusCounts.Pending,
        InProgress: statusCounts["In Progress"],
        Completed: statusCounts.Completed,
        All: totalTask,
    };

    return {
        statistics: {
            totalTask,
            pendingTasks: statusCounts.Pending,
            inProgressTasks: statusCounts["In Progress"],
            completedTasks: statusCounts.Completed,
            overDueTasks: result?.overdue?.[0]?.count || 0,
        },
        charts: {
            taskDistributions,
            taskPriorityLevels: {
                Low: priorityCounts.Low,
                Medium: priorityCounts.Medium,
                High: priorityCounts.High,
            },
        },
        recentTasks: result?.recent || [],
    };
};

export const TASK_STATUSES = STATUSES;
export const TASK_PRIORITIES = PRIORITIES;

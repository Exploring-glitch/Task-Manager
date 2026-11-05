import excelJs from "exceljs";
import Task from "../models/taskSchema.js";
import User from "../models/userSchema.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { formatDateOnly, sendWorkbook } from "../utils/excelHelper.js";

const TASK_REPORT_COLUMNS = [
    { header: "Task Id", key: "_id", width: 25 },
    { header: "Title", key: "title", width: 30 },
    { header: "Description", key: "description", width: 50 },
    { header: "Priority", key: "priority", width: 15 },
    { header: "Status", key: "status", width: 20 },
    { header: "Due Date", key: "dueDate", width: 20 },
    { header: "Assigned To", key: "assignedTo", width: 40 },
];

const USER_REPORT_COLUMNS = [
    { header: "User Name", key: "name", width: 30 },
    { header: "Email", key: "email", width: 40 },
    { header: "Total Assigned Tasks", key: "taskCount", width: 22 },
    { header: "Pending Tasks", key: "pendingTasks", width: 20 },
    { header: "In Progress Tasks", key: "inProgressTasks", width: 20 },
    { header: "Completed Tasks", key: "completedTasks", width: 20 },
];

const formatAssignees = (assignedTo = []) => {
    return assignedTo
        .filter(Boolean)
        .map((user) => `${user.name} ( ${user.email} )`)
        .join(", ");
};

// access: admin
export const exportTasksReport = asyncHandler(async (req, res) => {
    const tasks = await Task.find().populate("assignedTo", "name email");

    const workbook = new excelJs.Workbook();
    const worksheet = workbook.addWorksheet("Task Report");
    worksheet.columns = TASK_REPORT_COLUMNS;

    tasks.forEach((task) => {
        worksheet.addRow({
            _id: String(task._id),
            title: task.title,
            description: task.description,
            priority: task.priority,
            status: task.status,
            dueDate: formatDateOnly(task.dueDate),
            assignedTo: formatAssignees(task.assignedTo) || "Unassigned",
        });
    });

    await sendWorkbook(res, workbook, "tasks_report.xlsx");
});

// access: admin
export const exportUsersReport = asyncHandler(async (req, res) => {
    // Match the Team Members page and the assignee picker: admin accounts are
    // not counted as team members even though they can own tasks.
    const [users, tasks] = await Promise.all([
        User.find({ role: "member" }).select("name email").lean(),
        Task.find().select("assignedTo status").lean(),
    ]);

    const userStats = new Map(
        users.map((user) => [
            String(user._id),
            {
                name: user.name,
                email: user.email,
                taskCount: 0,
                pendingTasks: 0,
                inProgressTasks: 0,
                completedTasks: 0,
            },
        ])
    );

    tasks.forEach((task) => {
        (task.assignedTo || []).forEach((assigneeId) => {
            const stats = userStats.get(String(assigneeId));
            if (!stats) return;

            stats.taskCount += 1;

            if (task.status === "Pending") stats.pendingTasks += 1;
            else if (task.status === "In Progress") stats.inProgressTasks += 1;
            else if (task.status === "Completed") stats.completedTasks += 1;
        });
    });

    const workbook = new excelJs.Workbook();
    const worksheet = workbook.addWorksheet("User Tasks Report");
    worksheet.columns = USER_REPORT_COLUMNS;

    userStats.forEach((stats) => worksheet.addRow(stats));

    await sendWorkbook(res, workbook, "users_report.xlsx");
});

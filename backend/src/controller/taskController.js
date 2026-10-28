import { createTaskDao, findTaskById, findTaskByIdWithUser, findTasks } from "../dao/taskDao.js";
import { getDashboardStats, getStatusSummary, TASK_STATUSES } from "../dao/taskStatsDao.js";
import { countUsersByIds } from "../dao/userDao.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { badRequest, forbidden, notFound } from "../utils/errors.js";
import { canAccessTask } from "../utils/taskAccess.js";
import {
    parseChecklistPayload,
    parseStatusPayload,
    parseTaskCreatePayload,
    parseTaskUpdatePayload,
} from "../utils/taskValidation.js";

// access: admin
export const createTask = asyncHandler(async (req, res) => {
    const payload = parseTaskCreatePayload(req.body);

    if (payload.assignedTo.length > 0) {
        const usersFound = await countUsersByIds(payload.assignedTo);

        if (usersFound !== payload.assignedTo.length) {
            throw badRequest("One or more assigned users do not exist");
        }
    }

    const task = await createTaskDao({ ...payload, createdBy: req.user._id });

    res.status(201).json({ message: "Task created successfully", task });
});

// access: admin
export const updateTaskById = asyncHandler(async (req, res) => {
    const task = await findTaskById(req.params.id);

    if (!task) {
        throw notFound("Task not found");
    }

    const update = parseTaskUpdatePayload(req.body);

    if (update.assignedTo) {
        const usersFound = await countUsersByIds(update.assignedTo);

        if (usersFound !== update.assignedTo.length) {
            throw badRequest("One or more assigned users do not exist");
        }
    }

    Object.assign(task, update);

    // Keep the derived fields consistent when the checklist is replaced.
    if (update.todoCheckLists) {
        task.syncProgress();
    }

    const updatedTask = await task.save();

    res.status(200).json({ message: "Task updated successfully", task: updatedTask });
});

// get all tasks. access: admin (all tasks), member (only assigned tasks)
export const getTasks = asyncHandler(async (req, res) => {
    const { status } = req.query;
    const filter = {};
    const isAdmin = req.user.role === "admin";

    if (status) {
        if (!TASK_STATUSES.includes(status)) {
            throw badRequest(`Status must be one of: ${TASK_STATUSES.join(", ")}`);
        }

        filter.status = status;
    }

    const [tasks, statusSummary] = await Promise.all([
        findTasks({ filter, userId: isAdmin ? undefined : req.user._id }),
        getStatusSummary(isAdmin ? undefined : req.user._id),
    ]);

    res.status(200).json({ tasks, statusSummary });
});

// get task by id. access: admin or assigned member
export const getTaskById = asyncHandler(async (req, res) => {
    const task = await findTaskByIdWithUser(req.params.id);

    if (!task) {
        throw notFound("Task not found");
    }

    if (!canAccessTask(task, req.user)) {
        throw forbidden("You do not have access to this task");
    }

    res.status(200).json(task);
});

// access: admin
export const deleteTaskById = asyncHandler(async (req, res) => {
    const task = await findTaskById(req.params.id);

    if (!task) {
        throw notFound("Task not found");
    }

    await task.deleteOne();

    res.status(200).json({ message: "Task deleted successfully" });
});

// update a task status. access: admin (all tasks), member (assigned tasks only)
export const updateTaskStatusById = asyncHandler(async (req, res) => {
    const task = await findTaskById(req.params.id);

    if (!task) {
        throw notFound("Task not found");
    }

    if (!canAccessTask(task, req.user)) {
        throw forbidden("You do not have access to this task");
    }

    const status = parseStatusPayload(req.body);

    task.status = status;

    if (status === "Completed") {
        task.setChecklistCompletion(true);
    } else {
        // Do not wipe the checklist when a task is reopened, only recalculate.
        task.recalculateProgress();
    }

    await task.save();

    res.status(200).json({ message: "Task status updated successfully", task });
});

// update the checklist of a task. access: admin (all tasks), member (assigned tasks only)
export const updateTaskChecklist = asyncHandler(async (req, res) => {
    const task = await findTaskById(req.params.id);

    if (!task) {
        throw notFound("Task not found");
    }

    if (!canAccessTask(task, req.user)) {
        throw forbidden("You do not have access to this task");
    }

    task.todoCheckLists = parseChecklistPayload(req.body);
    task.syncProgress();

    await task.save();

    const updatedTask = await findTaskByIdWithUser(req.params.id);

    res.status(200).json({ message: "Task updated successfully", tasks: updatedTask });
});

// access: admin
export const getDashboardData = asyncHandler(async (req, res) => {
    const data = await getDashboardStats();
    res.status(200).json(data);
});

// access: logged-in members
export const getUserDashboardData = asyncHandler(async (req, res) => {
    const data = await getDashboardStats(req.user._id);
    res.status(200).json(data);
});

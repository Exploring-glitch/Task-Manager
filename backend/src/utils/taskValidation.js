import mongoose from "mongoose";
import { TASK_PRIORITIES, TASK_STATUSES } from "../dao/taskStatsDao.js";
import { badRequest, forbidden } from "./errors.js";
import {
    optionalString,
    requireArray,
    requireDate,
    requireEnum,
    requireString,
} from "./validation.js";

const parseAssignees = (value) => {
    const assignees = requireArray(value, "assignedTo");
    const invalidIds = assignees.filter((id) => !mongoose.isValidObjectId(id));

    if (invalidIds.length > 0) {
        throw badRequest("assignedTo contains invalid user ids");
    }

    return assignees;
};

const parseChecklist = (value) => {
    return requireArray(value, "todoCheckLists").map((item, index) => {
        if (!item || typeof item !== "object") {
            throw badRequest(`todoCheckLists[${index}] must be an object`);
        }

        return {
            text: requireString(item.text, `todoCheckLists[${index}].text`, { max: 200 }),
            completed: Boolean(item.completed),
        };
    });
};

const parseAttachments = (value) => {
    return requireArray(value, "attachments").map((link, index) =>
        requireString(link, `attachments[${index}]`, { max: 2048 })
    );
};

export const parseTaskUpdatePayload = (body) => {
    const update = {};

    if (body.title !== undefined) {
        update.title = requireString(body.title, "Title", { max: 200 });
    }

    if (body.description !== undefined) {
        update.description = optionalString(body.description, "Description", { max: 5000 }) || "";
    }

    if (body.priority !== undefined) {
        update.priority = requireEnum(body.priority, "Priority", TASK_PRIORITIES);
    }

    if (body.dueDate !== undefined) {
        update.dueDate = requireDate(body.dueDate, "Due date");
    }

    if (body.assignedTo !== undefined) {
        update.assignedTo = parseAssignees(body.assignedTo);
    }

    if (body.attachments !== undefined) {
        update.attachments = parseAttachments(body.attachments);
    }

    if (body.todoCheckLists !== undefined) {
        update.todoCheckLists = parseChecklist(body.todoCheckLists);
    }

    return update;
};

export const parseTaskCreatePayload = (body) => {
    return {
        title: requireString(body.title, "Title", { max: 200 }),
        description: optionalString(body.description, "Description", { max: 5000 }) || "",
        priority:
            body.priority === undefined
                ? "Medium"
                : requireEnum(body.priority, "Priority", TASK_PRIORITIES),
        status:
            body.status === undefined
                ? "Pending"
                : requireEnum(body.status, "Status", TASK_STATUSES),
        dueDate: requireDate(body.dueDate, "Due date"),
        assignedTo: body.assignedTo === undefined ? [] : parseAssignees(body.assignedTo),
        attachments: body.attachments === undefined ? [] : parseAttachments(body.attachments),
        todoCheckLists:
            body.todoCheckLists === undefined ? [] : parseChecklist(body.todoCheckLists),
    };
};

export const parseChecklistPayload = (body) => {
    if (body.todoCheckLists === undefined) {
        throw badRequest("todoCheckLists is required");
    }

    return parseChecklist(body.todoCheckLists);
};

/**
 * Members may tick checklist items off, but the checklist itself belongs to the
 * task definition. Reject renamed, reordered, added or removed items so the
 * member endpoint cannot silently rewrite the task.
 */
export const assertChecklistStructureUnchanged = (current, incoming) => {
    const currentTexts = (current || []).map((item) => item.text);
    const incomingTexts = incoming.map((item) => item.text);

    if (
        currentTexts.length !== incomingTexts.length ||
        currentTexts.some((text, index) => text !== incomingTexts[index])
    ) {
        throw forbidden("You can only update checklist completion");
    }
};

export const parseStatusPayload = (body) => {
    return requireEnum(body.status, "Status", TASK_STATUSES);
};

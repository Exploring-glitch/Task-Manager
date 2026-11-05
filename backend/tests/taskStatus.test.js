import assert from "node:assert/strict";
import { describe, it } from "node:test";
import Task from "../src/models/taskSchema.js";
import { applyTaskStatus } from "../src/utils/taskStatus.js";

const buildTask = () =>
    new Task({
        title: "Ship the release",
        dueDate: new Date("2026-11-05T00:00:00.000Z"),
        todoCheckLists: [
            { text: "Write notes", completed: false },
            { text: "Publish", completed: false },
        ],
    });

describe("task status changes", () => {
    it("ticks every checklist item when a task is completed", () => {
        const task = buildTask();

        applyTaskStatus(task, "Completed");

        assert.equal(task.status, "Completed");
        assert.equal(task.progress, 100);
        assert.ok(task.todoCheckLists.every((item) => item.completed));
    });

    it("clears automatic completion when a completed task is reopened", () => {
        const task = buildTask();
        applyTaskStatus(task, "Completed");

        applyTaskStatus(task, "In Progress");

        assert.equal(task.status, "In Progress");
        assert.equal(task.progress, 0);
        assert.ok(task.todoCheckLists.every((item) => !item.completed));
    });

    it("keeps the requested status while recalculating an open task", () => {
        const task = buildTask();
        task.todoCheckLists[0].completed = true;

        applyTaskStatus(task, "Pending");

        assert.equal(task.status, "Pending");
        assert.equal(task.progress, 50);
    });
});

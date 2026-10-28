import mongoose from "mongoose";
import "../models/userSchema.js";

const todoSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
        },

        completed: {
            type: Boolean,
            default: false,
        },
    },
    { _id: false }
);

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            default: "",
        },

        priority: {
            type: String,
            enum: ["Low", "Medium", "High"],
            default: "Medium",
        },

        status: {
            type: String,
            enum: ["Pending", "In Progress", "Completed"],
            default: "Pending",
        },

        dueDate: {
            type: Date,
            required: true,
        },

        assignedTo: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        attachments: [
            {
                type: String,
            },
        ],

        todoCheckLists: [todoSchema],

        progress: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// Number of checklist items that are marked as done.
taskSchema.virtual("completedTodoCount").get(function () {
    return this.todoCheckLists.filter((item) => item.completed).length;
});

/**
 * Recomputes progress from the checklist without touching the status.
 */
taskSchema.methods.recalculateProgress = function () {
    const totalItems = this.todoCheckLists.length;
    const completedItems = this.todoCheckLists.filter((item) => item.completed).length;

    this.progress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

    return this.progress;
};

/**
 * Recomputes progress from the checklist and keeps the status in sync.
 * Used by the checklist endpoint and when a task is marked as completed.
 */
taskSchema.methods.syncProgress = function () {
    this.recalculateProgress();

    if (this.todoCheckLists.length > 0) {
        if (this.progress === 100) {
            this.status = "Completed";
        } else if (this.progress > 0) {
            this.status = "In Progress";
        } else {
            this.status = "Pending";
        }
    }

    return this.progress;
};

// Marks every checklist item with the same value, e.g. when a task is closed.
taskSchema.methods.setChecklistCompletion = function (completed) {
    this.todoCheckLists.forEach((item) => {
        item.completed = completed;
    });

    return this.syncProgress();
};

const taskModel = mongoose.model("Task", taskSchema);
export default taskModel;

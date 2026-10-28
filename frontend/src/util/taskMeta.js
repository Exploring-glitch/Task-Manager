export const TASK_STATUSES = ["Pending", "In Progress", "Completed"];
export const TASK_STATUS_FILTERS = ["All", ...TASK_STATUSES];
export const PRIORITIES = ["Low", "Medium", "High"];

const STATUS_BADGE_CLASSES = {
    Pending: "text-violet-500 bg-violet-50 border-violet-500/10",
    "In Progress": "text-cyan-500 bg-cyan-50 border-cyan-500/10",
    Completed: "text-lime-500 bg-lime-50 border-lime-500/10",
};

const PRIORITY_BADGE_CLASSES = {
    Low: "text-emerald-500 bg-emerald-50 border-emerald-500/10",
    Medium: "text-amber-500 bg-amber-50 border-amber-500/10",
    High: "text-rose-500 bg-rose-50 border-rose-500/10",
};

const STATUS_ACCENT_CLASSES = {
    Pending: "border-violet-500",
    "In Progress": "border-cyan-500",
    Completed: "border-indigo-500",
};

const STATUS_PROGRESS_CLASSES = {
    Pending: "bg-violet-500",
    "In Progress": "bg-cyan-500",
    Completed: "bg-indigo-500",
};

const FALLBACK_BADGE = "text-gray-500 bg-gray-50 border-gray-200";

export const getStatusBadgeClasses = (status) => STATUS_BADGE_CLASSES[status] || FALLBACK_BADGE;

export const getPriorityBadgeClasses = (priority) =>
    PRIORITY_BADGE_CLASSES[priority] || FALLBACK_BADGE;

export const getStatusAccentClass = (status) =>
    STATUS_ACCENT_CLASSES[status] || "border-violet-500";

export const getProgressBarClass = (status) => STATUS_PROGRESS_CLASSES[status] || "bg-violet-500";

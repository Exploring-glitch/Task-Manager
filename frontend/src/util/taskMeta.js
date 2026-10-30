export const TASK_STATUSES = ["Pending", "In Progress", "Completed"];
export const TASK_STATUS_FILTERS = ["All", ...TASK_STATUSES];
export const PRIORITIES = ["Low", "Medium", "High"];

const STATUS_BADGE_CLASSES = {
    Pending: "text-amber-700 bg-amber-50 border-amber-200/80",
    "In Progress": "text-sky-700 bg-sky-50 border-sky-200/80",
    Completed: "text-emerald-700 bg-emerald-50 border-emerald-200/80",
};

const PRIORITY_BADGE_CLASSES = {
    Low: "text-emerald-700 bg-emerald-50 border-emerald-200/80",
    Medium: "text-amber-700 bg-amber-50 border-amber-200/80",
    High: "text-rose-700 bg-rose-50 border-rose-200/80",
};

const STATUS_DOT_CLASSES = {
    Pending: "bg-amber-500",
    "In Progress": "bg-sky-500",
    Completed: "bg-emerald-500",
};

const PRIORITY_DOT_CLASSES = {
    Low: "bg-emerald-500",
    Medium: "bg-amber-500",
    High: "bg-rose-500",
};

const STATUS_PROGRESS_CLASSES = {
    Pending: "bg-amber-500",
    "In Progress": "bg-sky-500",
    Completed: "bg-emerald-500",
};

const FALLBACK_BADGE = "text-slate-600 bg-slate-50 border-slate-200";
const FALLBACK_DOT = "bg-slate-400";

export const getStatusBadgeClasses = (status) => STATUS_BADGE_CLASSES[status] || FALLBACK_BADGE;

export const getPriorityBadgeClasses = (priority) =>
    PRIORITY_BADGE_CLASSES[priority] || FALLBACK_BADGE;

export const getStatusDotClass = (status) => STATUS_DOT_CLASSES[status] || FALLBACK_DOT;

export const getPriorityDotClass = (priority) => PRIORITY_DOT_CLASSES[priority] || FALLBACK_DOT;

export const getProgressBarClass = (status) => STATUS_PROGRESS_CLASSES[status] || "bg-primary";

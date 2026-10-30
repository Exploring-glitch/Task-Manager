import { getPriorityBadgeClasses, getPriorityDotClass } from "../../util/taskMeta.js";

const TaskPriorityBadge = ({ priority, className = "" }) => {
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap ${getPriorityBadgeClasses(priority)} ${className}`}
        >
            <span className={`status-dot ${getPriorityDotClass(priority)}`} aria-hidden="true" />
            {priority}
        </span>
    );
};

export default TaskPriorityBadge;

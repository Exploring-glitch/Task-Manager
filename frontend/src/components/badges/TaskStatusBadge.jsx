import { getStatusBadgeClasses, getStatusDotClass } from "../../util/taskMeta.js";

const TaskStatusBadge = ({ status, className = "" }) => {
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap ${getStatusBadgeClasses(status)} ${className}`}
        >
            <span className={`status-dot ${getStatusDotClass(status)}`} aria-hidden="true" />
            {status}
        </span>
    );
};

export default TaskStatusBadge;

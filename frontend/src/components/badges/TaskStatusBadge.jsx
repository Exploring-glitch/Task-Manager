import { getStatusBadgeClasses } from "../../util/taskMeta.js";

const TaskStatusBadge = ({ status, className = "px-3 py-1.5 text-xs" }) => {
    return (
        <span
            className={`inline-block rounded border font-medium ${getStatusBadgeClasses(status)} ${className}`}
        >
            {status}
        </span>
    );
};

export default TaskStatusBadge;

import { getPriorityBadgeClasses } from "../../util/taskMeta.js";

const TaskPriorityBadge = ({ priority, className = "px-3 py-1.5 text-xs" }) => {
    return (
        <span
            className={`inline-block rounded border font-medium ${getPriorityBadgeClasses(priority)} ${className}`}
        >
            {priority}
        </span>
    );
};

export default TaskPriorityBadge;

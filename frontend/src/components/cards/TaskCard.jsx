import moment from "moment";
import { LuPaperclip } from "react-icons/lu";
import Progress from "../Progress.jsx";
import AvatarGroup from "../AvatarGroup.jsx";
import TaskPriorityBadge from "../badges/TaskPriorityBadge.jsx";
import TaskStatusBadge from "../badges/TaskStatusBadge.jsx";
import { getStatusAccentClass } from "../../util/taskMeta.js";

const formatDate = (value) => (value && moment(value).isValid() ? moment(value).format("Do MMM YYYY") : "N/A");

const TaskCard = ({
    title,
    description,
    priority,
    status,
    progress,
    createdAt,
    dueDate,
    assignedTo = [],
    attachmentCount = 0,
    completedTodoCount = 0,
    todoChecklists = [],
    onClick,
}) => {
    return (
        <div
            className="cursor-pointer rounded-xl border border-gray-200/50 bg-white py-4 shadow-md shadow-gray-100 transition hover:border-blue-200"
            onClick={onClick}
        >
            <div className="flex items-end gap-3 px-4">
                <TaskStatusBadge status={status} className="px-4 py-2 text-[11px]" />
                <TaskPriorityBadge priority={priority} className="px-4 py-2 text-[11px]" />
            </div>

            <div className={`border-l-[3px] px-4 ${getStatusAccentClass(status)}`}>
                <p className="mt-4 line-clamp-2 text-sm font-medium text-gray-800">{title}</p>
                <p className="mt-1.5 line-clamp-2 text-xs leading-4.5 text-gray-500">{description}</p>
                <p className="mb-3 mt-2 text-[13px] font-medium leading-4.5 text-gray-700/80">
                    Task Done:{" "}
                    <span className="font-semibold text-gray-700">
                        {completedTodoCount} / {todoChecklists.length}
                    </span>
                </p>

                <Progress progress={progress} status={status} />
            </div>

            <div className="px-4">
                <div className="my-1 flex items-center justify-between">
                    <div>
                        <label className="text-xs text-gray-500">Start Date</label>
                        <p className="text-[13px] font-medium text-gray-900">{formatDate(createdAt)}</p>
                    </div>

                    <div>
                        <label className="text-xs text-gray-500">Due Date</label>
                        <p className="text-[13px] font-medium text-gray-900">{formatDate(dueDate)}</p>
                    </div>
                </div>
            </div>

            <div className="mt-3 flex items-center justify-between px-4">
                <AvatarGroup avatars={assignedTo} />

                {attachmentCount > 0 && (
                    <div className="flex items-center gap-3 rounded-lg bg-blue-50 px-2.5 py-1.5">
                        <LuPaperclip className="text-primary" aria-hidden="true" />
                        <span className="text-xs text-gray-900">{attachmentCount}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskCard;

import moment from "moment";
import { LuArrowRight, LuPaperclip } from "react-icons/lu";
import Progress from "../Progress.jsx";
import AvatarGroup from "../AvatarGroup.jsx";
import TaskPriorityBadge from "../badges/TaskPriorityBadge.jsx";
import TaskStatusBadge from "../badges/TaskStatusBadge.jsx";

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
    const handleKeyDown = (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onClick?.();
        }
    };

    const totalItems = todoChecklists.length;
    const progressValue = Math.min(100, Math.max(0, Number(progress) || 0));

    return (
        <div
            role="button"
            tabIndex={0}
            onClick={onClick}
            onKeyDown={handleKeyDown}
            className="group surface-card surface-hover flex h-full cursor-pointer flex-col p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
        >
            <div className="flex items-start justify-between gap-3">
                <div className="flex flex-wrap items-center gap-1.5">
                    <TaskStatusBadge status={status} />
                    <TaskPriorityBadge priority={priority} />
                </div>

                {attachmentCount > 0 && (
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-slate-50 px-2 py-1 text-[11px] font-semibold text-slate-500 ring-1 ring-line">
                        <LuPaperclip className="text-xs" aria-hidden="true" />
                        {attachmentCount}
                    </span>
                )}
            </div>

            <h3 className="mt-4 line-clamp-2 text-[15px] font-semibold leading-6 text-ink transition group-hover:text-primary">
                {title}
            </h3>

            <p className="mt-1.5 line-clamp-2 min-h-[40px] text-xs leading-5 text-slate-500">
                {description || "No description provided."}
            </p>

            <div className="mt-4">
                <div className="flex items-center justify-between text-[11px] font-medium">
                    <span className="text-slate-500">Checklist progress</span>
                    <span className="text-slate-700">
                        {completedTodoCount}/{totalItems} · {progressValue}%
                    </span>
                </div>

                <div className="mt-2">
                    <Progress progress={progressValue} status={status} />
                </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-slate-50/80 px-3 py-2.5">
                <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-400">
                        Start
                    </p>
                    <p className="mt-0.5 text-xs font-semibold text-slate-700">{formatDate(createdAt)}</p>
                </div>

                <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-400">
                        Due
                    </p>
                    <p className="mt-0.5 text-xs font-semibold text-slate-700">{formatDate(dueDate)}</p>
                </div>
            </div>

            <div className="mt-auto flex items-center justify-between gap-3 border-t border-line/70 pt-4">
                <AvatarGroup avatars={assignedTo} />

                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary opacity-80 transition group-hover:opacity-100">
                    View task
                    <LuArrowRight className="text-sm" aria-hidden="true" />
                </span>
            </div>
        </div>
    );
};

export default TaskCard;

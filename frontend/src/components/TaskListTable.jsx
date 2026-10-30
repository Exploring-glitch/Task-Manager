import moment from "moment";
import { LuClipboardList } from "react-icons/lu";
import EmptyState from "./EmptyState.jsx";
import TaskPriorityBadge from "./badges/TaskPriorityBadge.jsx";
import TaskStatusBadge from "./badges/TaskStatusBadge.jsx";

const TaskListTable = ({ tableData = [] }) => {
    if (tableData.length === 0) {
        return (
            <EmptyState
                title="No recent tasks"
                description="New tasks will show up here as soon as they are created."
            />
        );
    }

    return (
        <div className="overflow-x-auto rounded-xl border border-line">
            <table className="min-w-full text-left">
                <thead className="bg-slate-50/80">
                    <tr>
                        <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                            Task
                        </th>
                        <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                            Status
                        </th>
                        <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                            Priority
                        </th>
                        <th className="hidden px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400 md:table-cell">
                            Created
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-line">
                    {tableData.map((task) => (
                        <tr key={task._id} className="group transition hover:bg-slate-50/70">
                            <td className="px-4 py-3.5">
                                <div className="flex items-center gap-3">
                                    <span className="icon-tile h-8 w-8 rounded-lg bg-primary-soft text-primary">
                                        <LuClipboardList className="text-sm" aria-hidden="true" />
                                    </span>

                                    <span className="line-clamp-1 max-w-[260px] text-sm font-medium text-slate-800">
                                        {task.title}
                                    </span>
                                </div>
                            </td>

                            <td className="px-4 py-3.5">
                                <TaskStatusBadge status={task.status} />
                            </td>

                            <td className="px-4 py-3.5">
                                <TaskPriorityBadge priority={task.priority} />
                            </td>

                            <td className="hidden whitespace-nowrap px-4 py-3.5 text-xs text-slate-500 md:table-cell">
                                {task.createdAt && moment(task.createdAt).isValid()
                                    ? moment(task.createdAt).format("Do MMM YYYY")
                                    : "N/A"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskListTable;

import moment from "moment";
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
        <div className="mt-3 overflow-x-auto rounded-lg p-0">
            <table className="min-w-full">
                <thead>
                    <tr className="text-left">
                        <th className="px-4 py-3 text-[13px] font-medium text-gray-800">Name</th>
                        <th className="px-4 py-3 text-[13px] font-medium text-gray-800">Status</th>
                        <th className="px-4 py-3 text-[13px] font-medium text-gray-800">Priority</th>
                        <th className="hidden px-4 py-3 text-[13px] font-medium text-gray-800 md:table-cell">
                            Created On
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {tableData.map((task) => (
                        <tr key={task._id} className="border-t border-gray-200">
                            <td className="mx-4 my-3 overflow-hidden text-[13px] text-gray-700">{task.title}</td>
                            <td className="px-4 py-4">
                                <TaskStatusBadge status={task.status} />
                            </td>
                            <td className="px-4 py-4">
                                <TaskPriorityBadge priority={task.priority} />
                            </td>
                            <td className="hidden whitespace-nowrap px-4 py-4 text-[13px] text-gray-700 md:table-cell">
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

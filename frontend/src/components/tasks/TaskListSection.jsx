import EmptyState from "../EmptyState.jsx";
import PageLoader from "../PageLoader.jsx";
import TaskCard from "../cards/TaskCard.jsx";
import TaskStatusList from "../TaskStatusList.jsx";

const buildTabs = (statusSummary = {}) => [
    { label: "All", count: statusSummary.all || 0 },
    { label: "Pending", count: statusSummary.pending || 0 },
    { label: "In Progress", count: statusSummary.inProgress || 0 },
    { label: "Completed", count: statusSummary.completed || 0 },
];

const TaskListSection = ({
    title,
    tasks,
    statusSummary,
    activeStatus,
    onStatusChange,
    onTaskClick,
    headerActions,
    emptyTitle,
    emptyDescription,
    loading,
}) => {
    const tabs = buildTabs(statusSummary);
    const hasTasks = tabs[0].count > 0;

    return (
        <div className="my-5">
            <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
                <h2 className="text-lg font-medium md:text-xl">{title}</h2>

                {hasTasks && (
                    <div className="flex flex-wrap items-center gap-3">
                        <TaskStatusList
                            tabs={tabs}
                            activeTab={activeStatus}
                            setActiveTab={onStatusChange}
                        />
                        {headerActions}
                    </div>
                )}
            </div>

            {loading ? (
                <PageLoader label="Loading tasks..." />
            ) : tasks.length === 0 ? (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3">
                    <EmptyState title={emptyTitle} description={emptyDescription} />
                </div>
            ) : (
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                    {tasks.map((task) => (
                        <TaskCard
                            key={task._id}
                            title={task.title}
                            description={task.description}
                            priority={task.priority}
                            status={task.status}
                            progress={task.progress}
                            createdAt={task.createdAt}
                            dueDate={task.dueDate}
                            assignedTo={(task.assignedTo || []).map((user) => user?.profileImageUrl)}
                            attachmentCount={task.attachments?.length || 0}
                            completedTodoCount={task.completedTodoCount || 0}
                            todoChecklists={task.todoCheckLists || []}
                            onClick={() => onTaskClick(task)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskListSection;

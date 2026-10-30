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
    const totalTasks = tabs[0].count;
    const hasTasks = totalTasks > 0;

    return (
        <div className="animate-fade-in">
            <div className="flex flex-col justify-between gap-4 pb-6 lg:flex-row lg:items-end">
                <div>
                    <p className="page-eyebrow">Task board</p>
                    <h1 className="mt-1 text-2xl font-bold tracking-tight text-ink sm:text-[28px]">{title}</h1>
                    <p className="mt-1.5 text-sm leading-6 text-slate-500">
                        {hasTasks
                            ? `${totalTasks} task${totalTasks === 1 ? "" : "s"} in this workspace view.`
                            : "Tasks assigned to you will appear here."}
                    </p>
                </div>

                {hasTasks && (
                    <div className="flex flex-wrap items-center gap-2">
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
                <div className="grid grid-cols-1">
                    <EmptyState title={emptyTitle} description={emptyDescription} />
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
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

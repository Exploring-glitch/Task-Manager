import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import toast from "react-hot-toast";
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import DashboardLayout from "../../components/layouts/DashboardLayout.jsx";
import AvatarGroup from "../../components/AvatarGroup.jsx";
import EmptyState from "../../components/EmptyState.jsx";
import PageLoader from "../../components/PageLoader.jsx";
import Progress from "../../components/Progress.jsx";
import TaskStatusBadge from "../../components/badges/TaskStatusBadge.jsx";
import { get_task_details_by_id, update_todoCheckLists } from "../../api/tasksApi.js";

const ViewTaskDetails = () => {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [savingChecklist, setSavingChecklist] = useState(false);

    useEffect(() => {
        let isActive = true;

        const run = async () => {
            try {
                const response = await get_task_details_by_id(id);
                if (isActive) setTask(response);
            } catch (error) {
                if (isActive) toast.error(error.message || "Could not load the task");
            } finally {
                if (isActive) setLoading(false);
            }
        };

        if (id) run();

        return () => {
            isActive = false;
        };
    }, [id]);

    const toggleChecklistItem = async (index) => {
        if (!task || savingChecklist) return;

        const previousTask = task;
        const todoCheckLists = (task.todoCheckLists || []).map((item, itemIndex) =>
            itemIndex === index ? { ...item, completed: !item.completed } : item
        );

        setTask({ ...task, todoCheckLists });
        setSavingChecklist(true);

        try {
            const response = await update_todoCheckLists(id, { todoCheckLists });
            if (response?.tasks) setTask(response.tasks);
        } catch (error) {
            setTask(previousTask);
            toast.error(error.message || "Could not update the checklist");
        } finally {
            setSavingChecklist(false);
        }
    };

    const handleLinkClick = (link) => {
        const url = /^https?:\/\//i.test(link) ? link : `https://${link}`;
        window.open(url, "_blank", "noopener,noreferrer");
    };

    if (loading) {
        return (
            <DashboardLayout activeMenu="My Tasks">
                <PageLoader label="Loading task..." />
            </DashboardLayout>
        );
    }

    if (!task) {
        return (
            <DashboardLayout activeMenu="My Tasks">
                <div className="mt-5 grid grid-cols-1 md:grid-cols-3">
                    <EmptyState
                        title="Task not found"
                        description="The task may have been deleted or is not assigned to you."
                    />
                </div>
            </DashboardLayout>
        );
    }

    const checklists = task.todoCheckLists || [];
    const attachments = task.attachments || [];

    return (
        <DashboardLayout activeMenu="My Tasks">
            <div className="mt-5 grid grid-cols-1 md:grid-cols-4">
                <div className="col-span-3 my-3 rounded-2xl border border-gray-200/50 p-6 shadow-md shadow-gray-200">
                    <div className="flex items-center justify-between gap-3">
                        <h2 className="text-sm font-medium md:text-xl">{task.title}</h2>
                        <TaskStatusBadge status={task.status} className="px-4 py-0.5 text-[11px] md:text-[13px]" />
                    </div>

                    <div className="mt-4">
                        <InfoBox label="Description" value={task.description} />
                    </div>

                    <div className="mt-4 grid grid-cols-12 gap-4">
                        <div className="col-span-6 md:col-span-4">
                            <InfoBox label="Priority" value={task.priority} />
                        </div>

                        <div className="col-span-6 md:col-span-4">
                            <InfoBox
                                label="Due Date"
                                value={task.dueDate ? moment(task.dueDate).format("Do MMM YYYY") : "N/A"}
                            />
                        </div>

                        <div className="col-span-6 md:col-span-4">
                            <p className="text-xs font-medium text-slate-500">Assigned To</p>
                            <div className="mt-1">
                                <AvatarGroup
                                    avatars={(task.assignedTo || []).map((user) => user?.profileImageUrl)}
                                    maxVisible={5}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-slate-500">Progress</span>
                            <span className="text-xs font-medium text-slate-500">{task.progress || 0}%</span>
                        </div>
                        <div className="mt-1">
                            <Progress progress={task.progress} status={task.status} />
                        </div>
                    </div>

                    <div className="mt-4">
                        <p className="text-xs font-medium text-slate-500">Todo Checklist</p>

                        {checklists.length === 0 ? (
                            <p className="mt-2 text-xs text-gray-500">No checklist items for this task.</p>
                        ) : (
                            checklists.map((item, index) => (
                                <TodoCheckList
                                    key={`${item.text}-${index}`}
                                    text={item.text}
                                    isChecked={item.completed}
                                    disabled={savingChecklist}
                                    onChange={() => toggleChecklistItem(index)}
                                />
                            ))
                        )}
                    </div>

                    {attachments.length > 0 && (
                        <div className="mt-4">
                            <p className="text-xs font-medium text-slate-500">Attachments</p>

                            {attachments.map((link, index) => (
                                <Attachment
                                    key={`${link}-${index}`}
                                    link={link}
                                    index={index}
                                    onClick={() => handleLinkClick(link)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ViewTaskDetails;

const InfoBox = ({ label, value }) => {
    return (
        <>
            <p className="text-xs font-medium text-slate-500">{label}</p>
            <p className="mt-0.5 text-[12px] font-medium text-gray-700 md:text-[13px]">{value || "N/A"}</p>
        </>
    );
};

const TodoCheckList = ({ text, isChecked, onChange, disabled }) => {
    return (
        <label className="flex cursor-pointer items-center gap-3 p-3">
            <input
                type="checkbox"
                checked={Boolean(isChecked)}
                onChange={onChange}
                disabled={disabled}
                className="h-4 w-4 cursor-pointer rounded-sm border-gray-300 bg-gray-100 text-primary outline-none disabled:cursor-wait"
            />

            <p className={`text-[13px] text-gray-800 ${isChecked ? "line-through opacity-60" : ""}`}>{text}</p>
        </label>
    );
};

const Attachment = ({ link, index, onClick }) => {
    return (
        <button
            type="button"
            className="mt-2 flex w-full cursor-pointer justify-between rounded-md border border-gray-100 bg-gray-50 px-3 py-2 text-left hover:border-gray-300"
            onClick={onClick}
        >
            <div className="flex flex-1 items-center gap-3">
                <span className="mr-2 text-xs font-semibold text-gray-400">
                    {index < 9 ? `0${index + 1}` : index + 1}
                </span>

                <p className="truncate text-xs text-black">{link}</p>
            </div>

            <LuSquareArrowOutUpRight className="text-gray-400" aria-hidden="true" />
        </button>
    );
};

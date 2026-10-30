import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import toast from "react-hot-toast";
import {
    LuArrowLeft,
    LuCalendarDays,
    LuFlag,
    LuListChecks,
    LuPaperclip,
    LuSquareArrowOutUpRight,
} from "react-icons/lu";
import DashboardLayout from "../../components/layouts/DashboardLayout.jsx";
import Avatar from "../../components/ui/Avatar.jsx";
import AvatarGroup from "../../components/AvatarGroup.jsx";
import EmptyState from "../../components/EmptyState.jsx";
import PageLoader from "../../components/PageLoader.jsx";
import Progress from "../../components/Progress.jsx";
import SectionCard from "../../components/ui/SectionCard.jsx";
import TaskStatusBadge from "../../components/badges/TaskStatusBadge.jsx";
import TaskPriorityBadge from "../../components/badges/TaskPriorityBadge.jsx";
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
                <div className="grid grid-cols-1">
                    <EmptyState
                        title="Task not found"
                        description="The task may have been deleted or is not assigned to you."
                        action={
                            <Link to="/member/tasks" className="btn btn-primary">
                                <LuArrowLeft className="text-base" aria-hidden="true" />
                                Back to my tasks
                            </Link>
                        }
                    />
                </div>
            </DashboardLayout>
        );
    }

    const checklists = task.todoCheckLists || [];
    const attachments = task.attachments || [];
    const assignedTo = task.assignedTo || [];
    const completedCount = checklists.filter((item) => item.completed).length;
    const progressValue = Math.min(100, Math.max(0, Number(task.progress) || 0));

    return (
        <DashboardLayout activeMenu="My Tasks">
            <div className="animate-fade-in pb-6">
                <Link
                    to="/member/tasks"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-primary"
                >
                    <LuArrowLeft className="text-sm" aria-hidden="true" />
                    Back to my tasks
                </Link>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                    <TaskStatusBadge status={task.status} />
                    <TaskPriorityBadge priority={task.priority} />
                </div>

                <h1 className="mt-3 max-w-3xl text-2xl font-bold tracking-tight text-ink sm:text-[30px]">
                    {task.title}
                </h1>

                <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-slate-500">
                    <LuCalendarDays className="text-sm text-slate-400" aria-hidden="true" />
                    Due {task.dueDate ? moment(task.dueDate).format("Do MMM YYYY") : "date not set"}
                </p>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_330px]">
                <div className="space-y-5">
                    <SectionCard title="Description">
                        <p className="whitespace-pre-line text-sm leading-7 text-slate-600">
                            {task.description || "No description was provided for this task."}
                        </p>
                    </SectionCard>

                    <SectionCard
                        title="Checklist"
                        description={`${completedCount} of ${checklists.length} steps complete`}
                        actions={
                            <span className="rounded-full bg-primary-soft px-2.5 py-1 text-[11px] font-bold text-primary">
                                {progressValue}%
                            </span>
                        }
                    >
                        <Progress progress={progressValue} status={task.status} />

                        {savingChecklist && (
                            <p className="mt-3 text-[11px] font-medium text-slate-400">Saving checklist...</p>
                        )}

                        {checklists.length === 0 ? (
                            <p className="mt-4 rounded-xl border border-dashed border-line bg-slate-50/60 px-4 py-6 text-center text-xs text-slate-500">
                                No checklist items for this task.
                            </p>
                        ) : (
                            <div className="mt-4 space-y-2">
                                {checklists.map((item, index) => (
                                    <TodoCheckList
                                        key={`${item.text}-${index}`}
                                        text={item.text}
                                        isChecked={item.completed}
                                        disabled={savingChecklist}
                                        onChange={() => toggleChecklistItem(index)}
                                    />
                                ))}
                            </div>
                        )}
                    </SectionCard>

                    {attachments.length > 0 && (
                        <SectionCard
                            title="Attachments"
                            description={`${attachments.length} link${attachments.length === 1 ? "" : "s"} shared with this task`}
                        >
                            <div className="space-y-2">
                                {attachments.map((link, index) => (
                                    <Attachment
                                        key={`${link}-${index}`}
                                        link={link}
                                        index={index}
                                        onClick={() => handleLinkClick(link)}
                                    />
                                ))}
                            </div>
                        </SectionCard>
                    )}
                </div>

                <aside className="space-y-5">
                    <SectionCard title="Overview">
                        <div>
                            <div className="flex items-center justify-between text-[11px] font-semibold">
                                <span className="text-slate-500">Progress</span>
                                <span className="text-slate-800">{progressValue}%</span>
                            </div>

                            <div className="mt-2">
                                <Progress progress={progressValue} status={task.status} />
                            </div>
                        </div>

                        <div className="mt-5 divide-y divide-line/70">
                            <InfoRow
                                icon={LuFlag}
                                label="Priority"
                                value={<TaskPriorityBadge priority={task.priority} />}
                            />
                            <InfoRow
                                icon={LuCalendarDays}
                                label="Due date"
                                value={
                                    task.dueDate ? moment(task.dueDate).format("Do MMM YYYY") : "Not set"
                                }
                            />
                            <InfoRow
                                icon={LuListChecks}
                                label="Checklist"
                                value={`${completedCount}/${checklists.length} done`}
                            />
                        </div>
                    </SectionCard>

                    <SectionCard title={`Assigned team (${assignedTo.length})`}>
                        {assignedTo.length === 0 ? (
                            <p className="text-xs text-slate-500">No one is assigned yet.</p>
                        ) : (
                            <div className="space-y-3">
                                {assignedTo.map((member) => (
                                    <div key={member?._id || member?.email} className="flex items-center gap-3">
                                        <Avatar
                                            src={member?.profileImageUrl}
                                            name={member?.name}
                                            size="md"
                                            className="ring-2 ring-slate-50"
                                        />

                                        <div className="min-w-0">
                                            <p className="truncate text-xs font-semibold text-slate-800">
                                                {member?.name || "Team member"}
                                            </p>
                                            <p className="truncate text-[11px] text-slate-500">
                                                {member?.email || ""}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="mt-4 border-t border-line/70 pt-4">
                            <AvatarGroup
                                avatars={assignedTo.map((user) => user?.profileImageUrl)}
                                maxVisible={5}
                            />
                        </div>
                    </SectionCard>
                </aside>
            </div>
        </DashboardLayout>
    );
};

export default ViewTaskDetails;

const InfoRow = ({ icon: Icon, label, value }) => {
    return (
        <div className="flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
            <span className="inline-flex items-center gap-2 text-xs text-slate-500">
                <Icon className="text-sm text-slate-400" aria-hidden="true" />
                {label}
            </span>

            <span className="text-right text-xs font-semibold text-slate-800">{value}</span>
        </div>
    );
};

const TodoCheckList = ({ text, isChecked, onChange, disabled }) => {
    return (
        <label
            className={`flex cursor-pointer items-start gap-3 rounded-xl border px-3.5 py-3 transition ${
                isChecked
                    ? "border-emerald-100 bg-emerald-50/40"
                    : "border-line bg-white hover:border-primary/30 hover:bg-slate-50/70"
            } ${disabled ? "cursor-wait opacity-80" : ""}`}
        >
            <input
                type="checkbox"
                checked={Boolean(isChecked)}
                onChange={onChange}
                disabled={disabled}
                className="mt-0.5 h-4 w-4 cursor-pointer rounded border-slate-300 text-primary outline-none"
            />

            <span
                className={`text-sm leading-5 ${
                    isChecked ? "text-slate-400 line-through" : "text-slate-700"
                }`}
            >
                {text}
            </span>
        </label>
    );
};

const Attachment = ({ link, index, onClick }) => {
    return (
        <button
            type="button"
            className="group flex w-full cursor-pointer items-center gap-3 rounded-xl border border-line bg-slate-50/50 px-3.5 py-3 text-left transition hover:border-primary/30 hover:bg-white"
            onClick={onClick}
        >
            <span className="icon-tile h-9 w-9 rounded-lg bg-white text-primary ring-1 ring-line">
                <LuPaperclip className="text-sm" aria-hidden="true" />
            </span>

            <span className="min-w-0 flex-1 truncate text-xs font-medium text-slate-700">
                <span className="mr-2 text-[10px] font-semibold text-slate-400">
                    {index < 9 ? `0${index + 1}` : index + 1}
                </span>
                {link}
            </span>

            <LuSquareArrowOutUpRight
                className="shrink-0 text-slate-400 transition group-hover:text-primary"
                aria-hidden="true"
            />
        </button>
    );
};

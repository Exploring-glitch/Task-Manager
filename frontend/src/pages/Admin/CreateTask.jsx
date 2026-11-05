import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import toast from "react-hot-toast";
import {
    LuArrowLeft,
    LuCalendarDays,
    LuCircleAlert,
    LuCircleCheck,
    LuClipboardList,
    LuFlag,
    LuListChecks,
    LuPaperclip,
    LuPlus,
    LuSparkles,
    LuTrash2,
    LuUsers,
} from "react-icons/lu";
import DashboardLayout from "../../components/layouts/DashboardLayout.jsx";
import ConfirmationModal from "../../components/ConfirmationModal.jsx";
import Modal from "../../components/Modal.jsx";
import AddAttachmentInput from "../../components/inputs/AddAttachmentInput.jsx";
import SelectDropDown from "../../components/inputs/SelectDropDown.jsx";
import SelectUsers from "../../components/inputs/SelectUsers.jsx";
import TodoListInput from "../../components/inputs/TodoListInput.jsx";
import PageLoader from "../../components/PageLoader.jsx";
import Button from "../../components/ui/Button.jsx";
import PageHeader from "../../components/ui/PageHeader.jsx";
import SectionCard from "../../components/ui/SectionCard.jsx";
import TaskPriorityBadge from "../../components/badges/TaskPriorityBadge.jsx";
import { PRIORITY_DATA } from "../../util/data.js";
import {
    create_task,
    delete_task,
    get_task_details_by_id,
    update_task,
} from "../../api/tasksApi.js";

const EMPTY_TASK = {
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
    assignedTo: [],
    todoChecklists: [],
    attachments: [],
};

const validateTask = (taskData) => {
    if (!taskData.title.trim()) return "Title is required.";
    if (!taskData.description.trim()) return "Description is required.";
    if (!taskData.dueDate) return "Due date is required.";
    if (!moment(taskData.dueDate, "YYYY-MM-DD", true).isValid()) return "Enter a valid due date.";
    if (taskData.assignedTo.length === 0) return "Assign the task to at least one member.";
    if (taskData.todoChecklists.length === 0) return "Add at least one checklist item.";

    return "";
};

const CreateTask = () => {
    const { id: taskId } = useParams();
    const navigate = useNavigate();

    const [taskData, setTaskData] = useState(EMPTY_TASK);
    const [currentTask, setCurrentTask] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(Boolean(taskId));
    const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

    const isEditing = Boolean(taskId);

    const handleValueChange = (key, value) => {
        setTaskData((previous) => ({ ...previous, [key]: value }));
    };

    const buildChecklistPayload = () => {
        const previousItems = currentTask?.todoCheckLists || [];

        return taskData.todoChecklists.map((text, index) => {
            // Prefer the item at the same position so duplicate labels keep
            // their own completion state, then fall back to a text match.
            const previousItem =
                previousItems[index]?.text === text
                    ? previousItems[index]
                    : previousItems.find((item) => item.text === text);

            return { text, completed: previousItem?.completed ?? false };
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const validationError = validateTask(taskData);
        setError(validationError);
        if (validationError) return;

        setLoading(true);

        try {
            // Build the payload inside the try block so an unexpected value can
            // never throw before the error handling and loading reset run.
            const payload = {
                title: taskData.title,
                description: taskData.description,
                priority: taskData.priority,
                dueDate: moment(taskData.dueDate, "YYYY-MM-DD", true).toISOString(),
                assignedTo: taskData.assignedTo,
                attachments: taskData.attachments,
                todoCheckLists: buildChecklistPayload(),
            };

            if (isEditing) {
                await update_task(taskId, payload);
                toast.success("Task updated successfully");
            } else {
                await create_task(payload);
                toast.success("Task created successfully");
            }

            navigate("/admin/tasks");
        } catch (submitError) {
            const message = submitError.message || "Could not save the task";
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            await delete_task(taskId);
            setOpenDeleteAlert(false);
            toast.success("Task deleted successfully");
            navigate("/admin/tasks");
        } catch (deleteError) {
            toast.error(deleteError.message || "Could not delete the task");
        }
    };

    useEffect(() => {
        if (!taskId) {
            setCurrentTask(null);
            setTaskData(EMPTY_TASK);
            setFetching(false);
            return undefined;
        }

        let isActive = true;

        const loadTask = async () => {
            try {
                const task = await get_task_details_by_id(taskId);
                if (!isActive || !task) return;

                setCurrentTask(task);
                setTaskData({
                    title: task.title || "",
                    description: task.description || "",
                    priority: task.priority || "Medium",
                    dueDate: task.dueDate ? moment(task.dueDate).format("YYYY-MM-DD") : "",
                    assignedTo: (task.assignedTo || []).map((user) => user?._id).filter(Boolean),
                    todoChecklists: (task.todoCheckLists || []).map((item) => item.text),
                    attachments: task.attachments || [],
                });
            } catch (loadError) {
                toast.error(loadError.message || "Could not load the task");
                navigate("/admin/tasks");
            } finally {
                if (isActive) setFetching(false);
            }
        };

        loadTask();

        return () => {
            isActive = false;
        };
    }, [taskId, navigate]);

    if (fetching) {
        return (
            <DashboardLayout activeMenu="Manage Task">
                <PageLoader label="Loading task..." />
            </DashboardLayout>
        );
    }

    const dueDateLabel =
        taskData.dueDate && moment(taskData.dueDate).isValid()
            ? moment(taskData.dueDate).format("D MMM YYYY")
            : "Not set";

    return (
        <DashboardLayout activeMenu={isEditing ? "Manage Task" : "Create Task"}>
            <PageHeader
                eyebrow={isEditing ? "Task editor" : "New task"}
                title={isEditing ? "Edit task" : "Create a task"}
                description={
                    isEditing
                        ? "Update the details, checklist or assignees, then save your changes."
                        : "Give your team clear context, owners and a checklist to work through."
                }
                icon={LuClipboardList}
                actions={
                    <>
                        <Link to="/admin/tasks" className="btn btn-secondary">
                            <LuArrowLeft className="text-base" aria-hidden="true" />
                            Back to tasks
                        </Link>

                        {isEditing && (
                            <Button variant="danger" icon={LuTrash2} onClick={() => setOpenDeleteAlert(true)}>
                                Delete
                            </Button>
                        )}
                    </>
                }
            />

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
                <div className="space-y-5">
                    {error && (
                        <div
                            role="alert"
                            className="flex items-start gap-2.5 rounded-xl border border-rose-200/80 bg-rose-50 px-4 py-3 text-sm text-rose-700"
                        >
                            <LuCircleAlert className="mt-0.5 shrink-0 text-base" aria-hidden="true" />
                            <span className="leading-5">{error}</span>
                        </div>
                    )}

                    <SectionCard
                        title="Task details"
                        description="The essentials your team needs to start working."
                    >
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="task-title" className="field-label">
                                    Task title <span className="text-rose-500">*</span>
                                </label>

                                <input
                                    id="task-title"
                                    name="title"
                                    placeholder="e.g. Design the onboarding flow"
                                    value={taskData.title}
                                    onChange={({ target }) => handleValueChange("title", target.value)}
                                    className="field-input"
                                />
                            </div>

                            <div>
                                <label htmlFor="task-description" className="field-label">
                                    Description <span className="text-rose-500">*</span>
                                </label>

                                <textarea
                                    id="task-description"
                                    name="description"
                                    placeholder="Describe the goal, context and anything the team should know."
                                    value={taskData.description}
                                    rows={4}
                                    onChange={({ target }) => handleValueChange("description", target.value)}
                                    className="field-textarea"
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <div>
                                    <label className="field-label">Priority</label>

                                    <SelectDropDown
                                        options={PRIORITY_DATA}
                                        value={taskData.priority}
                                        onChange={(value) => handleValueChange("priority", value)}
                                        placeholder="Select priority"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="task-due-date" className="field-label">
                                        Due date <span className="text-rose-500">*</span>
                                    </label>

                                    <input
                                        id="task-due-date"
                                        name="dueDate"
                                        type="date"
                                        value={taskData.dueDate}
                                        onChange={({ target }) => handleValueChange("dueDate", target.value)}
                                        className="field-input"
                                    />
                                </div>

                                <div>
                                    <label className="field-label">Assign to</label>

                                    <SelectUsers
                                        selectedUsers={taskData.assignedTo}
                                        setSelectedUsers={(value) => handleValueChange("assignedTo", value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </SectionCard>

                    <SectionCard
                        title="Checklist"
                        description="Break the work into steps. Progress updates as items are ticked off."
                    >
                        <TodoListInput
                            todolist={taskData.todoChecklists}
                            setTodoList={(value) => handleValueChange("todoChecklists", value)}
                        />
                    </SectionCard>

                    <SectionCard
                        title="Attachments"
                        description="Link to designs, documents or anything else the team needs."
                    >
                        <AddAttachmentInput
                            attachments={taskData.attachments}
                            setAttachments={(value) => handleValueChange("attachments", value)}
                        />
                    </SectionCard>
                </div>

                <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
                    <SectionCard title="Task summary" description="A quick check before publishing.">
                        <div className="divide-y divide-line/70">
                            <SummaryRow
                                icon={LuFlag}
                                label="Priority"
                                value={<TaskPriorityBadge priority={taskData.priority} />}
                            />
                            <SummaryRow icon={LuCalendarDays} label="Due date" value={dueDateLabel} />
                            <SummaryRow
                                icon={LuUsers}
                                label="Assignees"
                                value={`${taskData.assignedTo.length} selected`}
                            />
                            <SummaryRow
                                icon={LuListChecks}
                                label="Checklist"
                                value={`${taskData.todoChecklists.length} steps`}
                            />
                            <SummaryRow
                                icon={LuPaperclip}
                                label="Attachments"
                                value={`${taskData.attachments.length} links`}
                            />
                        </div>

                        <div className="mt-5 space-y-2">
                            <Button
                                type="submit"
                                loading={loading}
                                icon={isEditing ? LuCircleCheck : LuPlus}
                                className="w-full"
                            >
                                {loading ? "Saving..." : isEditing ? "Save changes" : "Create task"}
                            </Button>

                            <Link to="/admin/tasks" className="btn btn-ghost w-full">
                                Cancel
                            </Link>
                        </div>
                    </SectionCard>

                    <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-indigo-600 via-indigo-600 to-violet-600 p-5 text-white shadow-lg shadow-primary/25">
                        <LuSparkles className="absolute -right-3 -bottom-3 text-7xl text-white/10" aria-hidden="true" />

                        <p className="text-sm font-semibold">Make it actionable</p>

                        <ul className="mt-3 space-y-2 text-xs leading-5 text-indigo-100">
                            <li className="flex gap-2">
                                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-indigo-200" />
                                Keep checklist steps small and specific.
                            </li>
                            <li className="flex gap-2">
                                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-indigo-200" />
                                Assign at least one clear owner.
                            </li>
                            <li className="flex gap-2">
                                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-indigo-200" />
                                Set a realistic due date the team can plan around.
                            </li>
                        </ul>
                    </div>
                </aside>
            </form>

            <Modal
                isOpen={openDeleteAlert}
                onClose={() => setOpenDeleteAlert(false)}
                title="Delete task"
                description="This action cannot be undone."
                size="lg"
            >
                <ConfirmationModal
                    content="Are you sure you want to delete this task? All checklist progress will be lost."
                    onConfirm={handleDelete}
                    btnText="Delete task"
                    onCancel={() => setOpenDeleteAlert(false)}
                />
            </Modal>
        </DashboardLayout>
    );
};

export default CreateTask;

const SummaryRow = ({ icon: Icon, label, value }) => {
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

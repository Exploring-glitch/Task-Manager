import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import toast from "react-hot-toast";
import { LuTrash2 } from "react-icons/lu";
import DashboardLayout from "../../components/layouts/DashboardLayout.jsx";
import ConfirmationModal from "../../components/ConfirmationModal.jsx";
import Modal from "../../components/Modal.jsx";
import AddAttachmentInput from "../../components/inputs/AddAttachmentInput.jsx";
import SelectDropDown from "../../components/inputs/SelectDropDown.jsx";
import SelectUsers from "../../components/inputs/SelectUsers.jsx";
import TodoListInput from "../../components/inputs/TodoListInput.jsx";
import PageLoader from "../../components/PageLoader.jsx";
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

        return taskData.todoChecklists.map((text) => {
            const previousItem = previousItems.find((item) => item.text === text);
            return { text, completed: previousItem?.completed ?? false };
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const validationError = validateTask(taskData);
        setError(validationError);
        if (validationError) return;

        setLoading(true);

        const payload = {
            title: taskData.title,
            description: taskData.description,
            priority: taskData.priority,
            dueDate: new Date(taskData.dueDate).toISOString(),
            assignedTo: taskData.assignedTo,
            attachments: taskData.attachments,
            todoCheckLists: buildChecklistPayload(),
        };

        try {
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

    return (
        <DashboardLayout activeMenu={isEditing ? "Manage Task" : "Create Task"}>
            <div className="mt-5">
                <form
                    onSubmit={handleSubmit}
                    className="mt-4 grid grid-cols-1 rounded-lg border border-gray-200/50 bg-white p-6 shadow-lg shadow-gray-100 md:grid-cols-4"
                >
                    <div className="md:col-span-3">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-medium">
                                {isEditing ? "Update Task" : "Create Task"}
                            </h2>

                            {isEditing && (
                                <button
                                    type="button"
                                    className="flex cursor-pointer items-center gap-1.5 rounded border border-rose-100 bg-rose-50 px-2 py-1 text-[13px] font-medium text-rose-500 hover:border-rose-300"
                                    onClick={() => setOpenDeleteAlert(true)}
                                >
                                    <LuTrash2 className="text-base" aria-hidden="true" /> Delete
                                </button>
                            )}
                        </div>

                        <div className="mt-4">
                            <label htmlFor="task-title" className="text-xs font-medium text-slate-600">
                                Task Title
                            </label>

                            <input
                                id="task-title"
                                name="title"
                                placeholder="Create App UI"
                                value={taskData.title}
                                onChange={({ target }) => handleValueChange("title", target.value)}
                                className="mt-2 w-full rounded-md border border-slate-100 bg-white px-2.5 py-3 text-sm text-black outline-none placeholder:text-gray-500"
                            />
                        </div>

                        <div className="mt-3">
                            <label
                                htmlFor="task-description"
                                className="text-xs font-medium text-slate-600"
                            >
                                Description
                            </label>

                            <textarea
                                id="task-description"
                                name="description"
                                placeholder="Describe the task"
                                value={taskData.description}
                                rows={4}
                                onChange={({ target }) => handleValueChange("description", target.value)}
                                className="mt-2 w-full rounded-md border border-slate-100 bg-white px-2.5 py-3 text-sm text-black outline-none placeholder:text-gray-500"
                            />
                        </div>

                        <div className="mt-3 grid grid-cols-12 gap-4">
                            <div className="col-span-6 md:col-span-4">
                                <label className="text-xs font-medium text-slate-600">Priority</label>

                                <SelectDropDown
                                    options={PRIORITY_DATA}
                                    value={taskData.priority}
                                    onChange={(value) => handleValueChange("priority", value)}
                                    placeholder="Select Priority"
                                />
                            </div>

                            <div className="col-span-6 md:col-span-4">
                                <label htmlFor="task-due-date" className="text-xs font-medium text-slate-600">
                                    Due Date
                                </label>

                                <input
                                    id="task-due-date"
                                    name="dueDate"
                                    type="date"
                                    value={taskData.dueDate}
                                    onChange={({ target }) => handleValueChange("dueDate", target.value)}
                                    className="mt-2 w-full rounded-md border border-slate-100 bg-white px-2.5 py-3 text-sm text-black outline-none placeholder:text-gray-500"
                                />
                            </div>

                            <div className="col-span-6 md:col-span-4">
                                <label className="text-xs font-medium text-slate-600">Assign To</label>

                                <SelectUsers
                                    selectedUsers={taskData.assignedTo}
                                    setSelectedUsers={(value) => handleValueChange("assignedTo", value)}
                                />
                            </div>
                        </div>

                        <div className="mt-3">
                            <label className="text-xs font-medium text-slate-600">TODO Checklist</label>

                            <TodoListInput
                                todolist={taskData.todoChecklists}
                                setTodoList={(value) => handleValueChange("todoChecklists", value)}
                            />
                        </div>

                        <div className="mt-3">
                            <label className="text-xs font-medium text-slate-600">Add Attachments</label>

                            <AddAttachmentInput
                                attachments={taskData.attachments}
                                setAttachments={(value) => handleValueChange("attachments", value)}
                            />
                        </div>

                        {error && (
                            <p role="alert" className="mt-5 text-xs font-medium text-red-500">
                                {error}
                            </p>
                        )}

                        <div className="mt-7 flex justify-center">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-medium whitespace-nowrap text-primary hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-70 md:text-sm"
                            >
                                {loading ? "Saving..." : isEditing ? "UPDATE TASK" : "CREATE TASK"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <Modal
                isOpen={openDeleteAlert}
                onClose={() => setOpenDeleteAlert(false)}
                title="Delete Task"
                size="lg"
            >
                <ConfirmationModal
                    content="Are you sure you want to delete this task?"
                    onConfirm={handleDelete}
                    btnText="Delete"
                    onCancel={() => setOpenDeleteAlert(false)}
                />
            </Modal>
        </DashboardLayout>
    );
};

export default CreateTask;

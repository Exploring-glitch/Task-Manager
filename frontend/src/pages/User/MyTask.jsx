import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout.jsx";
import TaskListSection from "../../components/tasks/TaskListSection.jsx";
import { useTasks } from "../../hooks/useTasks.js";

const MyTask = () => {
    const [status, setStatus] = useState("All");
    const { tasks, statusSummary, loading } = useTasks(status);
    const navigate = useNavigate();

    return (
        <DashboardLayout activeMenu="My Tasks">
            <TaskListSection
                title="My Tasks"
                tasks={tasks}
                statusSummary={statusSummary}
                activeStatus={status}
                onStatusChange={setStatus}
                onTaskClick={(task) => navigate(`/member/task-details/${task._id}`)}
                loading={loading}
                emptyTitle="No tasks assigned yet"
                emptyDescription="Tasks assigned to you by an admin will appear here."
            />
        </DashboardLayout>
    );
};

export default MyTask;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuPlus } from "react-icons/lu";
import DashboardLayout from "../../components/layouts/DashboardLayout.jsx";
import DownloadReportButton from "../../components/DownloadReportButton.jsx";
import TaskListSection from "../../components/tasks/TaskListSection.jsx";
import { download_task_report } from "../../api/reportApi.js";
import { useTasks } from "../../hooks/useTasks.js";

const ManageTasks = () => {
    const [status, setStatus] = useState("All");
    const { tasks, statusSummary, loading } = useTasks(status);
    const navigate = useNavigate();

    return (
        <DashboardLayout activeMenu="Manage Task">
            <TaskListSection
                title="All tasks"
                tasks={tasks}
                statusSummary={statusSummary}
                activeStatus={status}
                onStatusChange={setStatus}
                onTaskClick={(task) => navigate(`/admin/tasks/${task._id}/edit`)}
                loading={loading}
                emptyTitle="No tasks yet"
                emptyDescription="Create a task and assign it to your team members."
                emptyAction={
                    <Link to="/admin/create-tasks" className="btn btn-primary">
                        <LuPlus className="text-base" aria-hidden="true" />
                        Create your first task
                    </Link>
                }
                headerActions={
                    <DownloadReportButton fetcher={download_task_report} filename="task-details.xlsx" />
                }
            />
        </DashboardLayout>
    );
};

export default ManageTasks;

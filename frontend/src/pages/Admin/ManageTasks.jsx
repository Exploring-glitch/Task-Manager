import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
                title="All Tasks"
                tasks={tasks}
                statusSummary={statusSummary}
                activeStatus={status}
                onStatusChange={setStatus}
                onTaskClick={(task) => navigate(`/admin/tasks/${task._id}/edit`)}
                loading={loading}
                emptyTitle="No tasks yet"
                emptyDescription="Create a task and assign it to your team members."
                headerActions={
                    <DownloadReportButton
                        fetcher={download_task_report}
                        filename="task-details.xlsx"
                    />
                }
            />
        </DashboardLayout>
    );
};

export default ManageTasks;

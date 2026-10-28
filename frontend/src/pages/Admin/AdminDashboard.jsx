import DashboardLayout from "../../components/layouts/DashboardLayout.jsx";
import DashboardOverview from "../../components/dashboard/DashboardOverview.jsx";
import { dashboard_data } from "../../api/tasksApi.js";
import { useDashboardData } from "../../hooks/useDashboardData.js";

const AdminDashboard = () => {
    const { data, loading } = useDashboardData(dashboard_data);

    return (
        <DashboardLayout activeMenu="Dashboard">
            <DashboardOverview data={data} loading={loading} seeMorePath="/admin/tasks" />
        </DashboardLayout>
    );
};

export default AdminDashboard;

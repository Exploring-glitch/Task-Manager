import DashboardLayout from "../../components/layouts/DashboardLayout.jsx";
import DashboardOverview from "../../components/dashboard/DashboardOverview.jsx";
import { user_dashboard_data } from "../../api/userApi.js";
import { useDashboardData } from "../../hooks/useDashboardData.js";

const UserDashboard = () => {
    const { data, loading } = useDashboardData(user_dashboard_data);

    return (
        <DashboardLayout activeMenu="Dashboard">
            <DashboardOverview data={data} loading={loading} seeMorePath="/member/tasks" />
        </DashboardLayout>
    );
};

export default UserDashboard;

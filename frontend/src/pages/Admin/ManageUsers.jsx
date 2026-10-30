import { useEffect, useState } from "react";
import { LuUsers } from "react-icons/lu";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout.jsx";
import DownloadReportButton from "../../components/DownloadReportButton.jsx";
import EmptyState from "../../components/EmptyState.jsx";
import PageLoader from "../../components/PageLoader.jsx";
import PageHeader from "../../components/ui/PageHeader.jsx";
import UserCard from "../../components/cards/UserCard.jsx";
import { get_all_users } from "../../api/userApi.js";
import { download_user_report } from "../../api/reportApi.js";

const ManageUsers = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isActive = true;

        const loadUsers = async () => {
            try {
                const response = await get_all_users();
                if (isActive) setAllUsers(response || []);
            } catch (error) {
                if (isActive) toast.error(error.message || "Could not load team members");
            } finally {
                if (isActive) setLoading(false);
            }
        };

        loadUsers();

        return () => {
            isActive = false;
        };
    }, []);

    return (
        <DashboardLayout activeMenu="Team Members">
            <PageHeader
                eyebrow="Team"
                title="Team members"
                description="Everyone who can receive tasks and contribute to your workspace."
                icon={LuUsers}
                actions={
                    <DownloadReportButton
                        fetcher={download_user_report}
                        filename="user-details.xlsx"
                        label="Export team"
                    />
                }
            />

            {loading ? (
                <PageLoader label="Loading team members..." />
            ) : allUsers.length === 0 ? (
                <div className="grid grid-cols-1">
                    <EmptyState
                        title="No team members yet"
                        description="Members show up here after they sign up to the workspace."
                    />
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {allUsers.map((user) => (
                        <UserCard key={user._id} userInfo={user} />
                    ))}
                </div>
            )}
        </DashboardLayout>
    );
};

export default ManageUsers;

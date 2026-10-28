import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout.jsx";
import DownloadReportButton from "../../components/DownloadReportButton.jsx";
import EmptyState from "../../components/EmptyState.jsx";
import PageLoader from "../../components/PageLoader.jsx";
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
            <div className="mt-5 mb-10">
                <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                    <h2 className="text-xl font-medium">Team Members</h2>

                    <DownloadReportButton
                        fetcher={download_user_report}
                        filename="user-details.xlsx"
                        label="Download report"
                    />
                </div>

                {loading ? (
                    <PageLoader label="Loading team members..." />
                ) : allUsers.length === 0 ? (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3">
                        <EmptyState
                            title="No team members yet"
                            description="Members show up here after they sign up."
                        />
                    </div>
                ) : (
                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                        {allUsers.map((user) => (
                            <UserCard key={user._id} userInfo={user} />
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default ManageUsers;

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { logout_user } from "../../api/userApi.js";
import ConfirmationModal from "../../components/ConfirmationModal.jsx";
import Modal from "../../components/Modal.jsx";
import DashboardLayout from "../../components/layouts/DashboardLayout.jsx";
import { UserContext } from "../../context/UserContext.js";
import { getHomeRoute } from "../../routes/homeRoute.js";

const Logout_Page = () => {
    const { user, clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout_user();
            clearUser();
            toast.success("Logged out successfully");
            navigate("/auth/login", { replace: true });
        } catch (error) {
            toast.error(error.message || "Logout failed");
        }
    };

    const handleCancel = () => {
        navigate(getHomeRoute(user?.role), { replace: true });
    };

    return (
        <DashboardLayout activeMenu="Logout">
            <Modal isOpen onClose={handleCancel} title="Logout" size="lg">
                <ConfirmationModal
                    content="Are you sure you want to logout?"
                    onConfirm={handleLogout}
                    btnText="Logout"
                    onCancel={handleCancel}
                />
            </Modal>
        </DashboardLayout>
    );
};

export default Logout_Page;

import React from 'react'
import { useState } from 'react'
import { logout_user } from '../../api/userApi.js';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext.jsx';
import DashboardLayout from '../../components/layouts/DashboardLayout.jsx';
import { ModalDelete } from '../../components/ModalDelete.jsx';
import ConfirmationModal from '../../components/ConfirmationModal.jsx';

const Logout_Page = () => {
    const { user, clearUser } = useContext(UserContext);
    const [openLogoutAlert, setOpenLogoutAlert] = useState(true);

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await logout_user();
            setOpenLogoutAlert(false);

            toast.success("Logged out successfully")

            clearUser(); // remove user from context
            navigate("/auth/login"); // redirect to login
        }
        catch (err) {
            console.log("Logout failed: ", err);
            toast.error("Logout failed");
        }
        return  //after redirecting, return from the function i.e navigate(route) dosen't run
    }

    const handleCancel = () => {
        if (user?.user?.role === "admin") {
            navigate("/admin/dashboard");
        } else {
            navigate("/member/dashboard-user-data");
        }
    };

    return (
        <DashboardLayout activeMenu="Logout">
            <ModalDelete
                isOpen={openLogoutAlert}
                onClose={() => setOpenLogoutAlert(false)}
                title="Logout"
            >
                <ConfirmationModal
                    content="Are you sure you want to logout?"
                    onConfirm={() => handleLogout()}
                    btnText="Logout"
                    onCancel={() => handleCancel()}
                />
            </ModalDelete>

        </DashboardLayout>
    )
}

export default Logout_Page
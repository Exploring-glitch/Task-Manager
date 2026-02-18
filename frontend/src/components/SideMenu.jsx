import React, { useContext, useState } from 'react'
import { UserContext } from '../context/userContext.jsx'
import { useNavigate } from 'react-router-dom';
import { logout_user } from '../api/userApi.js';

const SideMenu = () => {
    const { user, clearUser } = useContext(UserContext);
    const [sideMenuData, setSideMenuData] = useState([]);

    const navigate = useNavigate();


    const handleClick = async (route) => {
        if (route == "/logout") {
            try {

                const response = await logout_user();
                console.log(response);
                toast.success("Logged out successfully");

                clearUser();
                navigate("/auth/login");
            } 
            catch (error) {
                console.error("Logout failed:", error);
            }
            return;
        }
        navigate(route)
    }



    return (
        <div>SideMenu</div>
    )
}

export default SideMenu
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

                clearUser(); // remove user from context
                navigate("/auth/login"); // redirect to login
            } 
            catch (error) {
                console.error("Logout failed:", error);
            }
            return; //after redirecting, return from the function i.e navigate(route) dosen't run
        }
        navigate(route) //if the route is not "logout" then this will run: redirect to the given route
    }



    return (
        <div>SideMenu</div>
    )
}

export default SideMenu
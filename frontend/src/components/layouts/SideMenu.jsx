import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/userContext.jsx'
import { useNavigate } from 'react-router-dom';
import { logout_user } from '../../api/userApi.js';
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from '../../util/data.jsx';
import toast from "react-hot-toast";



const SideMenu = ({ activeMenu }) => {
    const { user, loading, clearUser } = useContext(UserContext);
    const [sideMenuData, setSideMenuData] = useState([]);

    const navigate = useNavigate();

    if (loading) {
        return <div className="p-6">Loading...</div>;
    }

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

    useEffect(() => {
        if (user?.user) {
            setSideMenuData(user?.user?.role === "admin" ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA)
        }
        
    }, [user]);

    return (
        <div className='w-64 min-h-[calc(100vh-52px)] sticky top-13 z-10 bg-white border-r-2 border-gray-400/50'>
            <div className='flex flex-col items-center justify-center pt-5 mb-7'>
                <div className='relative'>
                    <img
                        src={user?.user?.profileImageUrl || ""}
                        alt='Profile Image'
                        className='w-20 h-20 rounded-full bg-slate-400'
                    />
                </div>

                {user?.user?.role === "admin" && (
                    <div className='text-[10px] font-medium text-white bg-[#1D4ED8] px-3 py-0.5 rounded mt-1'>
                        Admin
                    </div>
                )}

                <h5 className='text-gray-950 font-medium mt-3 leading-4'>
                    {user?.user?.name || ""}
                </h5>

                <p className='text-[12px] text-gray-500'>{user?.user?.email || ""} </p>
            </div>

            {sideMenuData?.length > 0 && sideMenuData.map((item, index) => (
                <button
                    key={`menu_${index}`}
                    className={`w-full flex items-center gap-4 text-[15px] 
                        ${activeMenu == item.label
                            ? "text-primary bg-linear-to-r from-blue-50/40 to-blue-100/50 border-r-3"
                            : ""
                        }
                    py-3 px-6 mb-3 cursor-pointer`}
                    onClick={() => handleClick(item.path)}
                >
                    <item.icon className="text-xl" />
                    {item.label}
                </button>
            ))}
        </div>
    )
}

export default SideMenu;
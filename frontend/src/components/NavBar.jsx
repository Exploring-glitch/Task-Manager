import React, { useContext, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { UserContext } from '../context/userContext.jsx';
import SideMenu from './SideMenu.jsx';
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";




const NavBar = ({activeMenu}) => {
    const location = useLocation();
    const path = location.pathname;

    const [openSideMenu, setOpenSideMenu] = useState(false);
    const { user } = useContext(UserContext);


    return (
        <header className="sticky top-0 z-50 w-screen bg-[#F5F8FF] border-b border-[#E3E8FF] overflow-hidden">
            <div className="w-full px-3 py-2 flex items-center justify-between 
                lg:py-2">

                <h1 className="text-lg font-bold text-[#1D4ED8]
                sm:text-xl
                lg:text-2xl
                2xl:text-4xl"> TaskManager </h1>

                <nav className="flex items-center gap-3">
                    {path === "/auth/login" && (
                        <Link
                            to="/auth/signup"
                            className="bg-[#1D4ED8] hover:bg-[#1E40AF] text-white px-4 py-1.5 rounded-lg transition"
                        >
                            Sign Up
                        </Link>
                    )}

                    {path === "/auth/signup" && (
                        <Link
                            to="/auth/login"
                            className="bg-[#1D4ED8] hover:bg-[#1E40AF] text-white px-4 py-1.5 rounded-lg transition"
                        >
                            Login
                        </Link>
                    )}
                </nav>

                {user && (
                    <div className='flex gap-5'>
                        <button
                            className='block lg:hidden text-black'
                            onClick={() => {
                                setOpenSideMenu(!openSideMenu);
                            }}
                        >
                            {openSideMenu 
                                ? ( <HiOutlineX className="text-2xl" />)
                                : ( <HiOutlineMenu className="text-2xl" /> )
                            }
                        </button>

                        <h2 className='text-lg font-medium'> Expense Tracker</h2>

                        {openSideMenu && (
                            <div className='w-64 h-[calc(100vh-52px)]'>
                                <SideMenu activeMenu={activeMenu} />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    )
}

export default NavBar
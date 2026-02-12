import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NavBar = (props) => {
    const location = useLocation();
    const path = location.pathname;

    return (
        <header className="sticky top-0 z-50 w-screen bg-[#F5F8FF] border-b border-[#E3E8FF] overflow-hidden">
            <div className="w-full px-3 py-2 flex items-center justify-between
                md:px-4 
                lg:py-4">

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
            </div>
        </header>
    )
}

export default NavBar
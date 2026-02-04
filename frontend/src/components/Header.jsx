import React from 'react'
import { Link } from 'react-router-dom'


const Header = () => {
    return (
        <header className="sticky top-0 z-50 max-w-screen bg-[#F5F8FF] border-b border-[#E3E8FF]">
            <div className="w-full px-3 py-3 flex items-center justify-between
                sm:px-10 ">
                    
                <h1 className="text-lg font-bold text-[#1D4ED8]
                sm:text-xl"> TaskManger </h1>

                <nav className="flex items-center gap-3 
                    sm:gap-6">

                    <Link
                        to="/home"
                        className="text-gray-600 hover:text-[#1D4ED8] font-medium transition text-xs 
                        sm:text-lg"
                    >Home</Link>

                    <Link
                        to="/auth/login"
                        className="hover:text-[#1D4ED8] font-medium transition text-white bg-[#1D4ED8] px-4 py-1.5 rounded text-xs 
                        sm:text-lg sm:text-gray-600 sm:bg-transparent sm:px-0 sm:py-0 sm:rounded-none"
                    >Login</Link>

                    <Link
                        to="/auth/signup"
                        className="hidden bg-[#1D4ED8] hover:bg-[#1E40AF] text-white px-4 py-1.5 rounded transition
                        sm:block"
                    >Sign Up</Link>
                </nav>
            </div>
        </header>
    )
}

export default Header



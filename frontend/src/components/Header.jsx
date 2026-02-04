import React from 'react'
import { Link } from 'react-router-dom'


const Header = () => {
    return (
        <header className="sticky top-0 z-50 max-w-screen bg-[#F5F8FF] border-b border-[#E3E8FF]">
            <div className="w-full px-3 py-2 flex items-center justify-between
                sm:px-7 
                lg:py-2
                2xl:py-2">
                    
                <h1 className="text-lg font-bold text-[#1D4ED8]
                sm:text-xl
                lg:text-2xl
                2xl:text-4xl"> TaskManger </h1>

                <nav className="flex items-center gap-3 
                    sm:gap-4
                    2xl:gap-8">

                    <Link
                        to="/home"
                        className="text-gray-600 hover:text-[#1D4ED8] font-medium transition text-xs 
                        sm:text-lg
                        md:text-xl
                        2xl:text-3xl"
                    >Home</Link>

                    <Link
                        to="/auth/login"
                        className="hover:text-[#1D4ED8] font-medium transition text-white bg-[#1D4ED8] px-4 py-1.5 rounded text-xs 
                        sm:text-lg sm:text-gray-600 sm:bg-transparent sm:px-0 sm:py-0 sm:rounded-none
                        md:text-xl
                        2xl:text-3xl"
                    >Login</Link>

                    <Link
                        to="/auth/signup"
                        className="hidden bg-[#1D4ED8] hover:bg-[#1E40AF] text-white px-4 py-1.5 rounded transition
                        sm:block
                        md:text-xl md:py-2
                        2xl:text-3xl 2xl:px-6 2xl:py-3.5 2xl:rounded-2xl"
                    >Sign Up</Link>
                </nav>
            </div>
        </header>
    )
}

export default Header



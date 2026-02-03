import React from 'react'
import { Link } from 'react-router-dom'


const Header = () => {
    return (
        <header className="sticky top-0 z-50 max-w-screen bg-[#F5F8FF] border-b border-[#E3E8FF]">
            <div className="w-full px-10 py-3 flex items-center justify-between">
                <h1 className="text-xl font-bold text-[#1D4ED8]">TaskManger</h1>

                <nav className="flex items-center gap-6">
                    <Link
                        to="/home"
                        className="text-gray-600 hover:text-[#1D4ED8] font-medium transition"
                    >Home</Link>

                    <Link
                        to="/auth/login"
                        className="text-gray-600 hover:text-[#1D4ED8] font-medium transition"
                    >Login</Link>

                    <Link
                        to="/auth/signup"
                        className="bg-[#1D4ED8] hover:bg-[#1E40AF] text-white px-4 py-1.5 rounded transition"
                    >Sign Up</Link>
                </nav>
            </div>
        </header>
    )
}

export default Header



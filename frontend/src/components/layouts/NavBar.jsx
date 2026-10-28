import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu.jsx";
import { useUser } from "../../hooks/useUser.js";

const NavBar = ({ activeMenu }) => {
    const { pathname } = useLocation();
    const [openSideMenu, setOpenSideMenu] = useState(false);
    const { user } = useUser();

    const isAuthPage = pathname.startsWith("/auth");
    const showMenuButton = Boolean(user) && !isAuthPage;

    return (
        <header className="sticky top-0 z-50 w-screen overflow-hidden border-b border-[#E3E8FF] bg-[#F5F8FF]">
            <div className="flex w-full items-center justify-between px-3 py-2">
                <Link to={user ? "/" : "/auth/login"} className="text-lg font-bold text-[#1D4ED8] sm:text-xl lg:text-2xl">
                    TaskManager
                </Link>

                {isAuthPage ? (
                    <nav className="flex items-center gap-3">
                        {pathname === "/auth/login" ? (
                            <Link
                                to="/auth/signup"
                                className="rounded-lg bg-[#1D4ED8] px-4 py-1.5 text-white transition hover:bg-[#1E40AF]"
                            >
                                Sign Up
                            </Link>
                        ) : (
                            <Link
                                to="/auth/login"
                                className="rounded-lg bg-[#1D4ED8] px-4 py-1.5 text-white transition hover:bg-[#1E40AF]"
                            >
                                Login
                            </Link>
                        )}
                    </nav>
                ) : (
                    <div className="flex items-center gap-3">
                        {user?.name && (
                            <span className="hidden text-sm font-medium text-gray-700 sm:block">
                                {user.name}
                            </span>
                        )}

                        {showMenuButton && (
                            <button
                                type="button"
                                aria-label={openSideMenu ? "Close navigation menu" : "Open navigation menu"}
                                aria-expanded={openSideMenu}
                                className="block text-black lg:hidden"
                                onClick={() => setOpenSideMenu((open) => !open)}
                            >
                                {openSideMenu ? (
                                    <HiOutlineX className="sm:text-2xl" />
                                ) : (
                                    <HiOutlineMenu className="sm:text-2xl" />
                                )}
                            </button>
                        )}
                    </div>
                )}
            </div>

            {openSideMenu && (
                <div className="fixed top-12 left-0 z-40 lg:hidden">
                    <SideMenu activeMenu={activeMenu} onNavigate={() => setOpenSideMenu(false)} />
                </div>
            )}
        </header>
    );
};

export default NavBar;

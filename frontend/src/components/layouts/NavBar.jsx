import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LuCheckCheck, LuMenu, LuX } from "react-icons/lu";
import SideMenu from "./SideMenu.jsx";
import Avatar from "../ui/Avatar.jsx";
import { useUser } from "../../hooks/useUser.js";

const NavBar = ({ activeMenu }) => {
    const { pathname } = useLocation();
    const [openSideMenu, setOpenSideMenu] = useState(false);
    const { user } = useUser();

    const isAuthPage = pathname === "/auth/login" || pathname === "/auth/signup";
    const showMenuButton = Boolean(user) && !isAuthPage;
    const pageTitle = activeMenu || (pathname === "/auth/signup" ? "Create account" : "Sign in");
    const isLoginPage = pathname === "/auth/login";

    const closeMenu = () => setOpenSideMenu(false);

    return (
        <header className="sticky top-0 z-50 border-b border-line/80 bg-white/80 backdrop-blur-xl">
            <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
                <div className="flex min-w-0 items-center gap-2">
                    {showMenuButton && (
                        <button
                            type="button"
                            aria-label={openSideMenu ? "Close navigation menu" : "Open navigation menu"}
                            aria-expanded={openSideMenu}
                            className="btn btn-ghost -ml-2 h-10 w-10 px-0 lg:hidden"
                            onClick={() => setOpenSideMenu((open) => !open)}
                        >
                            {openSideMenu ? (
                                <LuX className="text-xl" aria-hidden="true" />
                            ) : (
                                <LuMenu className="text-xl" aria-hidden="true" />
                            )}
                        </button>
                    )}

                    <Link
                        to={user ? "/" : "/auth/login"}
                        className="group flex items-center gap-2.5"
                        onClick={closeMenu}
                    >
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 to-violet-600 text-white shadow-md shadow-primary/30 transition group-hover:shadow-lg group-hover:shadow-primary/40">
                            <LuCheckCheck className="text-lg" aria-hidden="true" />
                        </span>

                        <span className="flex flex-col leading-none">
                            <span className="text-[15px] font-bold tracking-tight text-ink sm:text-base">
                                Task<span className="text-primary">Manager</span>
                            </span>
                            <span className="mt-0.5 hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 sm:block">
                                Team workspace
                            </span>
                        </span>
                    </Link>
                </div>

                {isAuthPage ? (
                    <div className="flex items-center gap-2.5">
                        <span className="hidden text-xs font-medium text-slate-500 sm:block">
                            {isLoginPage ? "New here?" : "Already a member?"}
                        </span>

                        <Link to={isLoginPage ? "/auth/signup" : "/auth/login"} className="btn btn-primary btn-sm">
                            {isLoginPage ? "Create account" : "Sign in"}
                        </Link>
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <div className="hidden items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 md:flex">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                            <span className="text-xs font-semibold text-slate-600">{pageTitle}</span>
                        </div>

                        <div className="flex items-center gap-2.5 border-line md:border-l md:pl-3">
                            <Avatar
                                src={user?.profileImageUrl}
                                name={user?.name}
                                size="sm"
                                className="ring-2 ring-primary-soft"
                            />

                            <div className="hidden min-w-0 sm:block">
                                <p className="max-w-[150px] truncate text-sm font-semibold leading-tight text-ink">
                                    {user?.name || "Account"}
                                </p>
                                <p className="text-[11px] capitalize leading-tight text-slate-400">
                                    {user?.role || "member"}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {openSideMenu && (
                <div className="lg:hidden">
                    <div
                        className="fixed inset-x-0 top-16 bottom-0 z-40 bg-slate-950/40 backdrop-blur-sm"
                        onClick={closeMenu}
                        aria-hidden="true"
                    />

                    <div className="animate-fade-in fixed top-16 bottom-0 left-0 z-50 w-72 shadow-2xl">
                        <SideMenu activeMenu={activeMenu} onNavigate={closeMenu} variant="mobile" />
                    </div>
                </div>
            )}
        </header>
    );
};

export default NavBar;

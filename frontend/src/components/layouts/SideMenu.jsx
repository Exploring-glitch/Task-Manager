import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { LuChevronRight, LuLogOut, LuSparkles } from "react-icons/lu";
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from "../../util/data.js";
import { useUser } from "../../hooks/useUser.js";
import Avatar from "../ui/Avatar.jsx";

const SideMenu = ({ activeMenu, onNavigate, variant = "desktop" }) => {
    const { user } = useUser();
    const navigate = useNavigate();

    const sideMenuData = useMemo(
        () => (user?.role === "admin" ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA),
        [user]
    );

    const menuItems = useMemo(() => sideMenuData.filter((item) => item.label !== "Logout"), [sideMenuData]);
    const logoutItem = useMemo(() => sideMenuData.find((item) => item.label === "Logout"), [sideMenuData]);

    const handleClick = (route) => {
        navigate(route);
        onNavigate?.();
    };

    const isAdmin = user?.role === "admin";

    return (
        <aside
            className={`flex w-72 shrink-0 flex-col border-r border-line bg-white/85 backdrop-blur-xl ${
                variant === "desktop" ? "sticky top-16 h-[calc(100vh-4rem)]" : "h-full"
            }`}
        >
            <div className="px-4 pt-5">
                <div className="rounded-2xl border border-line bg-linear-to-br from-indigo-50/70 via-white to-white p-4">
                    <div className="flex items-center gap-3">
                        <Avatar
                            src={user?.profileImageUrl}
                            name={user?.name}
                            size="lg"
                            className="ring-4 ring-white"
                        />

                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-ink">{user?.name || "Account"}</p>
                            <p className="truncate text-xs text-slate-500">{user?.email || ""}</p>

                            <span
                                className={`mt-1.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                                    isAdmin
                                        ? "bg-primary-soft text-primary"
                                        : "bg-sky-50 text-sky-700"
                                }`}
                            >
                                {isAdmin ? "Admin" : "Member"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <nav className="scrollbar-slim flex-1 overflow-y-auto px-3 py-5" aria-label="Main navigation">
                <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Workspace
                </p>

                <div className="space-y-1">
                    {menuItems.map((item) => {
                        const isActive = activeMenu === item.label;

                        return (
                            <button
                                key={item.id}
                                type="button"
                                aria-current={isActive ? "page" : undefined}
                                className={`group flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition duration-200 ${
                                    isActive
                                        ? "bg-primary text-white shadow-md shadow-primary/25"
                                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                }`}
                                onClick={() => handleClick(item.path)}
                            >
                                <span
                                    className={`icon-tile h-8 w-8 rounded-lg transition ${
                                        isActive
                                            ? "bg-white/15 text-white"
                                            : "bg-slate-50 text-slate-500 group-hover:bg-white group-hover:text-primary"
                                    }`}
                                >
                                    <item.icon className="text-base" aria-hidden="true" />
                                </span>

                                <span className="flex-1 text-left">{item.label}</span>

                                {isActive && <LuChevronRight className="text-base opacity-80" aria-hidden="true" />}
                            </button>
                        );
                    })}
                </div>

                <div className="mt-6 overflow-hidden rounded-2xl bg-linear-to-br from-indigo-600 via-indigo-600 to-violet-600 p-4 text-white shadow-lg shadow-primary/20">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/15">
                        <LuSparkles className="text-base" aria-hidden="true" />
                    </span>

                    <p className="mt-3 text-sm font-semibold">Stay on top of work</p>
                    <p className="mt-1 text-xs leading-5 text-indigo-100">
                        {isAdmin
                            ? "Assign clear owners and keep every checklist moving."
                            : "Tick off checklist items to keep your progress accurate."}
                    </p>
                </div>
            </nav>

            {logoutItem && (
                <div className="border-t border-line p-3">
                    <button
                        type="button"
                        aria-current={activeMenu === "Logout" ? "page" : undefined}
                        className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                            activeMenu === "Logout"
                                ? "bg-rose-50 text-rose-600"
                                : "text-slate-500 hover:bg-rose-50 hover:text-rose-600"
                        }`}
                        onClick={() => handleClick(logoutItem.path)}
                    >
                        <span className="icon-tile h-8 w-8 rounded-lg bg-transparent">
                            <LuLogOut className="text-base" aria-hidden="true" />
                        </span>
                        Logout
                    </button>
                </div>
            )}
        </aside>
    );
};

export default SideMenu;

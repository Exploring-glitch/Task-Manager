import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from "../../util/data.js";
import { useUser } from "../../hooks/useUser.js";

const SideMenu = ({ activeMenu, onNavigate }) => {
    const { user } = useUser();
    const navigate = useNavigate();

    const sideMenuData = useMemo(
        () => (user?.role === "admin" ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA),
        [user]
    );

    const handleClick = (route) => {
        navigate(route);
        onNavigate?.();
    };

    return (
        <div className="sticky top-13 z-10 min-h-[calc(100vh-52px)] w-64 border-r-2 border-gray-400/50 bg-white">
            <div className="mb-7 flex flex-col items-center justify-center pt-5">
                <img
                    src={user?.profileImageUrl || ""}
                    alt={user?.name ? `${user.name} profile` : "Profile image"}
                    className="h-20 w-20 rounded-full bg-slate-400 object-cover"
                />

                {user?.role === "admin" && (
                    <div className="mt-1 rounded bg-[#1D4ED8] px-3 py-0.5 text-[10px] font-medium text-white">
                        Admin
                    </div>
                )}

                <h5 className="mt-3 font-medium leading-4 text-gray-950">{user?.name || ""}</h5>
                <p className="text-[12px] text-gray-500">{user?.email || ""}</p>
            </div>

            {sideMenuData.map((item) => (
                <button
                    key={item.id}
                    type="button"
                    aria-current={activeMenu === item.label ? "page" : undefined}
                    className={`mb-3 flex w-full cursor-pointer items-center gap-4 px-6 py-3 text-[15px] ${
                        activeMenu === item.label
                            ? "border-r-3 bg-linear-to-r from-blue-50/40 to-blue-100/50 text-primary"
                            : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => handleClick(item.path)}
                >
                    <item.icon className="text-xl" aria-hidden="true" />
                    {item.label}
                </button>
            ))}
        </div>
    );
};

export default SideMenu;

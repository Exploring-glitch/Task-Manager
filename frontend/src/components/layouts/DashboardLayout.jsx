import NavBar from "./NavBar.jsx";
import SideMenu from "./SideMenu.jsx";
import { useUser } from "../../hooks/useUser.js";

const DashboardLayout = ({ children, activeMenu }) => {
    const { user } = useUser();

    return (
        <div>
            <NavBar activeMenu={activeMenu} />

            {user && (
                <div className="flex">
                    <div className="hidden lg:block">
                        <SideMenu activeMenu={activeMenu} />
                    </div>

                    <div className="h-[calc(100vh-52px)] w-screen overflow-x-hidden p-3">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardLayout;

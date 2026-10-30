import NavBar from "./NavBar.jsx";
import SideMenu from "./SideMenu.jsx";
import { useUser } from "../../hooks/useUser.js";

const DashboardLayout = ({ children, activeMenu }) => {
    const { user } = useUser();

    return (
        <div className="min-h-screen">
            <NavBar activeMenu={activeMenu} />

            {user && (
                <div className="flex">
                    <div className="hidden lg:block">
                        <SideMenu activeMenu={activeMenu} />
                    </div>

                    <main className="min-w-0 flex-1">
                        <div className="page-shell animate-fade-in">{children}</div>
                    </main>
                </div>
            )}
        </div>
    );
};

export default DashboardLayout;

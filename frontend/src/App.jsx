import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { UserProvider } from "./context/UserProvider.jsx";
import { useUser } from "./hooks/useUser.js";
import { getHomeRoute } from "./routes/homeRoute.js";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import PublicOnlyRoute from "./routes/PublicOnlyRoute.jsx";
import PageLoader from "./components/PageLoader.jsx";

import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import ManageTasks from "./pages/Admin/ManageTasks.jsx";
import CreateTask from "./pages/Admin/CreateTask.jsx";
import ManageUsers from "./pages/Admin/ManageUsers.jsx";
import UserDashboard from "./pages/User/UserDashboard.jsx";
import MyTask from "./pages/User/MyTask.jsx";
import ViewTaskDetails from "./pages/User/ViewTaskDetails.jsx";
import Login_Page from "./pages/Auth/Login_Page.jsx";
import Logout_Page from "./pages/Auth/Logout_Page.jsx";
import Signup_Page from "./pages/Auth/Signup_Page.jsx";
import NotFound from "./pages/NotFound.jsx";

const Root = () => {
    const { user, loading } = useUser();

    if (loading) {
        return <PageLoader label="Loading your workspace..." />;
    }

    if (!user) {
        return <Navigate to="/auth/login" replace />;
    }

    return <Navigate to={getHomeRoute(user.role)} replace />;
};

function App() {
    return (
        <UserProvider>
            <Toaster
                position="top-center"
                gutter={12}
                toastOptions={{
                    duration: 3200,
                    style: {
                        background: "#ffffff",
                        color: "#0f172a",
                        border: "1px solid #e7e9f2",
                        borderRadius: "12px",
                        boxShadow: "0 16px 40px -24px rgb(15 23 42 / 0.35)",
                        fontSize: "14px",
                        fontWeight: 500,
                        padding: "10px 14px",
                    },
                    success: { iconTheme: { primary: "#10b981", secondary: "#ffffff" } },
                    error: { iconTheme: { primary: "#f43f5e", secondary: "#ffffff" } },
                }}
            />

            <Routes>
                <Route element={<PublicOnlyRoute />}>
                    <Route path="/auth/login" element={<Login_Page />} />
                    <Route path="/auth/signup" element={<Signup_Page />} />
                </Route>

                {/* Available to every signed-in user */}
                <Route element={<PrivateRoute />}>
                    <Route path="/auth/logout" element={<Logout_Page />} />
                </Route>

                {/* Admin routes */}
                <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/tasks" element={<ManageTasks />} />
                    <Route path="/admin/tasks/:id/edit" element={<CreateTask />} />
                    <Route path="/admin/create-tasks" element={<CreateTask />} />
                    <Route path="/admin/team-members" element={<ManageUsers />} />
                </Route>

                {/* Member routes */}
                <Route element={<PrivateRoute allowedRoles={["member"]} />}>
                    <Route path="/member/dashboard-user-data" element={<UserDashboard />} />
                    <Route path="/member/tasks" element={<MyTask />} />
                    <Route path="/member/task-details/:id" element={<ViewTaskDetails />} />
                </Route>

                <Route path="/" element={<Root />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </UserProvider>
    );
}

export default App;

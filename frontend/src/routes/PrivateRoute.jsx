import { Navigate, Outlet } from "react-router-dom";
import PageLoader from "../components/PageLoader.jsx";
import { useUser } from "../hooks/useUser.js";
import { getHomeRoute } from "./homeRoute.js";

const PrivateRoute = ({ allowedRoles }) => {
    const { user, loading } = useUser();

    if (loading) {
        return <PageLoader label="Checking your session..." />;
    }

    if (!user) {
        return <Navigate to="/auth/login" replace />;
    }

    if (allowedRoles?.length && !allowedRoles.includes(user.role)) {
        // Send the user to the dashboard they are actually allowed to see.
        return <Navigate to={getHomeRoute(user.role)} replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;

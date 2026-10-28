import { Navigate, Outlet } from "react-router-dom";
import PageLoader from "../components/PageLoader.jsx";
import { useUser } from "../hooks/useUser.js";
import { getHomeRoute } from "./homeRoute.js";

// Keeps signed-in users away from the login and signup pages.
const PublicOnlyRoute = () => {
    const { user, loading } = useUser();

    if (loading) {
        return <PageLoader label="Checking your session..." />;
    }

    if (user) {
        return <Navigate to={getHomeRoute(user.role)} replace />;
    }

    return <Outlet />;
};

export default PublicOnlyRoute;

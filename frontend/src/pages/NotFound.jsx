import { Link } from "react-router-dom";
import { getHomeRoute } from "../routes/homeRoute.js";
import { useUser } from "../hooks/useUser.js";

const NotFound = () => {
    const { user } = useUser();

    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#F5F8FF] px-6 text-center">
            <h1 className="text-4xl font-bold text-[#1D4ED8]">404</h1>
            <p className="text-sm text-gray-600">The page you are looking for does not exist.</p>

            <Link
                to={user ? getHomeRoute(user.role) : "/auth/login"}
                className="rounded-lg bg-[#1D4ED8] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1E40AF]"
            >
                Go to {user ? "dashboard" : "login"}
            </Link>
        </div>
    );
};

export default NotFound;

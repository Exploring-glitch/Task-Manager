import { Link } from "react-router-dom";
import { LuArrowLeft, LuCheckCheck, LuCompass } from "react-icons/lu";
import { getHomeRoute } from "../routes/homeRoute.js";
import { useUser } from "../hooks/useUser.js";

const NotFound = () => {
    const { user } = useUser();

    return (
        <div className="flex min-h-screen items-center justify-center px-4 py-12">
            <div className="surface-card animate-fade-up w-full max-w-md p-8 text-center sm:p-10">
                <div className="flex justify-center">
                    <Link to={user ? "/" : "/auth/login"} className="inline-flex items-center gap-2.5">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 to-violet-600 text-white shadow-md shadow-primary/30">
                            <LuCheckCheck className="text-lg" aria-hidden="true" />
                        </span>

                        <span className="text-base font-bold tracking-tight text-ink">
                            Task<span className="text-primary">Manager</span>
                        </span>
                    </Link>
                </div>

                <div className="mt-8 flex justify-center">
                    <span className="icon-tile h-14 w-14 rounded-2xl bg-primary-soft text-primary ring-1 ring-primary/10">
                        <LuCompass className="text-2xl" aria-hidden="true" />
                    </span>
                </div>

                <p className="text-gradient mt-5 text-6xl font-extrabold leading-none">404</p>

                <h1 className="mt-3 text-xl font-bold text-ink">Page not found</h1>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                    The page you are looking for may have moved, or the link is no longer valid.
                </p>

                <Link
                    to={user ? getHomeRoute(user.role) : "/auth/login"}
                    className="btn btn-primary mt-7 w-full"
                >
                    <LuArrowLeft className="text-base" aria-hidden="true" />
                    {user ? "Back to dashboard" : "Go to sign in"}
                </Link>
            </div>
        </div>
    );
};

export default NotFound;

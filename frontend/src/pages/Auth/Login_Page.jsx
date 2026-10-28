import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout.jsx";
import AuthError from "../../components/forms/AuthError.jsx";
import { login_user } from "../../api/userApi.js";
import { useUser } from "../../hooks/useUser.js";
import { getHomeRoute } from "../../routes/homeRoute.js";

const Login_Page = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const emailRef = useRef(null);
    const passRef = useRef(null);

    const { updateUser } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        if (!email.trim()) {
            setError("Please enter your email");
            emailRef.current?.focus();
            return;
        }

        if (!password.trim()) {
            setError("Please enter your password");
            passRef.current?.focus();
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email address");
            return;
        }

        setLoading(true);

        try {
            const response = await login_user(email, password);

            updateUser(response.user);
            navigate(getHomeRoute(response.user?.role));
        } catch (loginError) {
            setError(loginError.message || "Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <div className="flex h-full w-full flex-col items-center justify-center px-3 md:relative md:z-10">
                <h1 className="text-4xl font-bold text-[#1D4ED8] lg:mb-1 2xl:text-5xl">Welcome Back</h1>

                <p className="mb-7 text-gray-600 md:text-gray-700 2xl:mt-4 2xl:text-xl">
                    Please enter your details to login
                </p>

                <AuthError message={error} />

                <form onSubmit={handleSubmit} className="w-full max-w-md">
                    <div className="mb-4">
                        <label
                            className="text-sm font-semibold md:text-base md:text-gray-700 2xl:text-2xl"
                            htmlFor="email"
                        >
                            Enter your email address
                        </label>

                        <input
                            id="email"
                            name="email"
                            autoComplete="email"
                            ref={emailRef}
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            type="email"
                            placeholder="Example: alex@example.com"
                            className="mt-2 w-full rounded border-2 border-[#D6E0FF] bg-[#F5F8FF] p-2 text-sm placeholder:text-sm focus:ring-2 focus:ring-[#2979FF] focus:outline-none md:text-base md:placeholder:text-base"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            className="text-sm font-semibold md:text-base md:text-gray-700 2xl:text-2xl"
                            htmlFor="password"
                        >
                            Enter your password here
                        </label>

                        <input
                            id="password"
                            name="password"
                            autoComplete="current-password"
                            ref={passRef}
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            type="password"
                            placeholder="Minimum 6 characters needed"
                            className="mt-2 w-full rounded border-2 border-[#D6E0FF] bg-[#F5F8FF] p-2 text-sm placeholder:text-sm focus:ring-2 focus:ring-[#2979FF] focus:outline-none md:text-base md:placeholder:text-base"
                        />
                    </div>

                    <div className="mb-3">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded bg-[#1D4ED8] px-4 py-2 font-semibold text-white transition-colors duration-200 hover:bg-[#1E40AF] focus:shadow-outline focus:outline-none disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {loading ? "Signing in..." : "LOGIN"}
                        </button>
                    </div>
                </form>

                <div className="text-center">
                    <p className="cursor-pointer text-sm text-gray-600 2xl:text-lg">
                        Don&apos;t have an account?{" "}
                        <Link
                            to="/auth/signup"
                            className="font-semibold text-[#1E63E6] hover:text-[#1D4ED8]"
                        >
                            <u>SignUp</u>
                        </Link>
                    </p>
                </div>
            </div>
        </AuthLayout>
    );
};

export default Login_Page;

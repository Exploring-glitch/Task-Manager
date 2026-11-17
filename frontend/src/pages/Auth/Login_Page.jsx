import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuArrowRight, LuEye, LuEyeOff, LuLock, LuMail, LuShieldCheck } from "react-icons/lu";
import AuthLayout from "../../components/layouts/AuthLayout.jsx";
import AuthError from "../../components/forms/AuthError.jsx";
import Button from "../../components/ui/Button.jsx";
import { login_user } from "../../api/userApi.js";
import { useUser } from "../../hooks/useUser.js";
import { getHomeRoute } from "../../routes/homeRoute.js";

const Login_Page = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const emailRef = useRef(null);
    const passRef = useRef(null);

    const { updateUser } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        const trimmedEmail = email.trim();

        if (!trimmedEmail) {
            setError("Please enter your email");
            emailRef.current?.focus();
            return;
        }

        if (!password.trim()) {
            setError("Please enter your password");
            passRef.current?.focus();
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
            setError("Please enter a valid email address");
            return;
        }

        setLoading(true);

        try {
            const response = await login_user(trimmedEmail, password);
            const user = response?.user;

            // Never redirect without a session user; that leaves the app on a
            // protected route with no way to recover.
            if (!user) {
                throw new Error("Login succeeded, but the session could not be started. Please try again.");
            }

            updateUser(user);
            navigate(getHomeRoute(user.role));
        } catch (loginError) {
            setError(loginError.message || "Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout variant="login">
            <div className="login-card">
                <div className="mb-7">
                    <span className="icon-tile mb-5 h-11 w-11 rounded-2xl bg-linear-to-br from-indigo-600 to-violet-600 text-white shadow-md shadow-primary/25">
                        <LuShieldCheck className="text-lg" aria-hidden="true" />
                    </span>

                    <p className="page-eyebrow">Welcome back</p>
                    <h1 className="mt-2 text-[26px] leading-tight font-bold tracking-tight text-ink sm:text-3xl">
                        Sign in to your workspace
                    </h1>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                        Enter your credentials to pick up where your team left off.
                    </p>
                </div>

                <AuthError message={error} />

                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <div>
                        <label className="field-label" htmlFor="email">
                            Email address
                        </label>

                        <div className="relative">
                            <LuMail
                                className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-base text-slate-400"
                                aria-hidden="true"
                            />

                            <input
                                id="email"
                                name="email"
                                autoComplete="email"
                                ref={emailRef}
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                type="email"
                                placeholder="alex@company.com"
                                className="field-input pl-10"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="field-label" htmlFor="password">
                            Password
                        </label>

                        <div className="relative">
                            <LuLock
                                className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-base text-slate-400"
                                aria-hidden="true"
                            />

                            <input
                                id="password"
                                name="password"
                                autoComplete="current-password"
                                ref={passRef}
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="field-input pr-11 pl-10"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword((value) => !value)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                            >
                                {showPassword ? (
                                    <LuEyeOff className="text-base" aria-hidden="true" />
                                ) : (
                                    <LuEye className="text-base" aria-hidden="true" />
                                )}
                            </button>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        size="lg"
                        loading={loading}
                        iconRight={LuArrowRight}
                        className="w-full"
                    >
                        {loading ? "Signing in..." : "Sign in"}
                    </Button>
                </form>

                <div className="my-6 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    <span className="h-px flex-1 bg-line" aria-hidden="true" />
                    New here?
                    <span className="h-px flex-1 bg-line" aria-hidden="true" />
                </div>

                <Link
                    to="/auth/signup"
                    className="btn btn-secondary w-full"
                >
                    Create an account
                    <LuArrowRight className="text-base" aria-hidden="true" />
                </Link>

                <div className="login-security-note">
                    <LuShieldCheck className="shrink-0 text-sm text-emerald-500" aria-hidden="true" />
                    Your session is protected with a secure, httpOnly cookie.
                </div>
            </div>
        </AuthLayout>
    );
};

export default Login_Page;

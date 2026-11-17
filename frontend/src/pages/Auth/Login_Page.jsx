import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    LuArrowRight,
    LuCircleAlert,
    LuEye,
    LuEyeOff,
    LuLock,
    LuMail,
    LuShieldCheck,
} from "react-icons/lu";
import AuthLayout from "../../components/layouts/AuthLayout.jsx";
import AuthError from "../../components/forms/AuthError.jsx";
import Button from "../../components/ui/Button.jsx";
import { login_user } from "../../api/userApi.js";
import { useUser } from "../../hooks/useUser.js";
import { getHomeRoute } from "../../routes/homeRoute.js";
import { validateLoginFields } from "../../util/loginValidation.js";

const Login_Page = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});

    const emailRef = useRef(null);
    const passRef = useRef(null);

    const { updateUser } = useUser();
    const navigate = useNavigate();

    const clearFieldError = (field) => {
        setFieldErrors((current) => (current[field] ? { ...current, [field]: "" } : current));
        if (error) setError("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const errors = validateLoginFields(email, password);
        setFieldErrors(errors);

        if (errors.email || errors.password) {
            setError("");
            (errors.email ? emailRef : passRef).current?.focus();
            return;
        }

        setError("");
        setLoading(true);

        try {
            const response = await login_user(email.trim(), password);
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

                <form onSubmit={handleSubmit} className="space-y-5" noValidate aria-busy={loading}>
                    <div>
                        <label className="field-label" htmlFor="email">
                            Email address
                        </label>

                        <div className="group relative">
                            <LuMail
                                className={`pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-base transition-colors ${
                                    fieldErrors.email ? "text-rose-400" : "text-slate-400 group-focus-within:text-primary"
                                }`}
                                aria-hidden="true"
                            />

                            <input
                                id="email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                ref={emailRef}
                                value={email}
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                    clearFieldError("email");
                                }}
                                type="email"
                                placeholder="alex@company.com"
                                aria-invalid={fieldErrors.email ? "true" : undefined}
                                aria-describedby={fieldErrors.email ? "email-error" : undefined}
                                className={`field-input pl-10 ${fieldErrors.email ? "border-rose-300" : ""}`}
                            />
                        </div>

                        {fieldErrors.email && (
                            <p id="email-error" className="login-field-error" role="alert">
                                <LuCircleAlert className="mt-0.5 shrink-0 text-xs" aria-hidden="true" />
                                {fieldErrors.email}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="field-label" htmlFor="password">
                            Password
                        </label>

                        <div className="group relative">
                            <LuLock
                                className={`pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-base transition-colors ${
                                    fieldErrors.password
                                        ? "text-rose-400"
                                        : "text-slate-400 group-focus-within:text-primary"
                                }`}
                                aria-hidden="true"
                            />

                            <input
                                id="password"
                                name="password"
                                autoComplete="current-password"
                                ref={passRef}
                                value={password}
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                    clearFieldError("password");
                                }}
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                aria-invalid={fieldErrors.password ? "true" : undefined}
                                aria-describedby={fieldErrors.password ? "password-error" : undefined}
                                className={`field-input pr-11 pl-10 ${fieldErrors.password ? "border-rose-300" : ""}`}
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword((value) => !value)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                aria-pressed={showPassword}
                                className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition hover:bg-primary-soft hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                            >
                                {showPassword ? (
                                    <LuEyeOff className="text-base" aria-hidden="true" />
                                ) : (
                                    <LuEye className="text-base" aria-hidden="true" />
                                )}
                            </button>
                        </div>

                        {fieldErrors.password && (
                            <p id="password-error" className="login-field-error" role="alert">
                                <LuCircleAlert className="mt-0.5 shrink-0 text-xs" aria-hidden="true" />
                                {fieldErrors.password}
                            </p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        size="lg"
                        loading={loading}
                        iconRight={LuArrowRight}
                        className="btn-auth mt-1 w-full hover:shadow-lg hover:shadow-emerald-600/25"
                    >
                        {loading ? "Signing in..." : "Sign in"}
                    </Button>
                </form>

                <div className="mt-6 border-t border-line/80 pt-5 text-center text-sm text-slate-500">
                    New to TaskManager?{" "}
                    <Link
                        to="/auth/signup"
                        className="inline-flex items-center gap-1 font-semibold text-emerald-700 transition hover:text-emerald-800 hover:underline"
                    >
                        Create an account
                        <LuArrowRight className="text-xs" aria-hidden="true" />
                    </Link>
                </div>

                <div className="login-security-note">
                    <LuShieldCheck className="shrink-0 text-sm text-emerald-500" aria-hidden="true" />
                    Your session is protected with a secure, httpOnly cookie.
                </div>
            </div>
        </AuthLayout>
    );
};

export default Login_Page;

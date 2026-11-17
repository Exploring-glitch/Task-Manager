import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
    LuArrowRight,
    LuEye,
    LuEyeOff,
    LuInfo,
    LuKeyRound,
    LuLock,
    LuMail,
    LuShieldCheck,
    LuUser,
} from "react-icons/lu";
import AuthLayout from "../../components/layouts/AuthLayout.jsx";
import AuthError from "../../components/forms/AuthError.jsx";
import ProfilePhotoSelector from "../../components/ProfilePhotoSelector.jsx";
import Button from "../../components/ui/Button.jsx";
import { signup_user, update_profile } from "../../api/userApi.js";
import { uploadImg } from "../../util/uploadImg.js";
import { useUser } from "../../hooks/useUser.js";
import { getHomeRoute } from "../../routes/homeRoute.js";

const Signup_Page = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [adminInviteToken, setAdminInviteToken] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passRef = useRef(null);

    const { updateUser } = useUser();
    const navigate = useNavigate();

    const validate = (trimmedEmail) => {
        if (!fullName.trim()) {
            nameRef.current?.focus();
            return "Please enter your full name";
        }

        if (!trimmedEmail) {
            emailRef.current?.focus();
            return "Please enter your email";
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
            return "Please enter a valid email address";
        }

        if (!password.trim()) {
            passRef.current?.focus();
            return "Please enter your password";
        }

        if (password.length < 6) {
            return "Password must contain at least 6 characters";
        }

        return "";
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        const trimmedEmail = email.trim();
        const validationError = validate(trimmedEmail);

        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);

        try {
            // The account has to exist before an image can be uploaded, because
            // the upload endpoint requires an authenticated session.
            const response = await signup_user(
                fullName,
                trimmedEmail,
                password,
                "",
                adminInviteToken
            );
            const user = response?.user;

            // Do not treat an empty response as a successful signup: without a
            // user the app cannot start a session and would silently redirect.
            if (!user) {
                throw new Error(
                    "Your account may have been created, but the session could not be started. Please sign in."
                );
            }

            updateUser(user);

            if (profilePic) {
                try {
                    const { imageUrl } = await uploadImg(profilePic);

                    if (imageUrl) {
                        const updated = await update_profile({ profileImageUrl: imageUrl });
                        if (updated?.user) updateUser(updated.user);
                    }
                } catch {
                    toast.error("Account created, but the profile photo could not be uploaded");
                }
            }

            toast.success("Account created successfully");
            navigate(getHomeRoute(user.role));
        } catch (signupError) {
            setError(signupError.message || "Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <div className="surface-card p-6 sm:p-8">
                <div className="mb-6">
                    <p className="page-eyebrow">Get started</p>
                    <h1 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                        Create your account
                    </h1>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                        Join your team workspace in under a minute.
                    </p>
                </div>

                <AuthError message={error} />

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label className="field-label" htmlFor="fullName">
                                Full name
                            </label>

                            <div className="relative">
                                <LuUser
                                    className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-base text-slate-400"
                                    aria-hidden="true"
                                />

                                <input
                                    id="fullName"
                                    name="name"
                                    autoComplete="name"
                                    ref={nameRef}
                                    value={fullName}
                                    onChange={(event) => setFullName(event.target.value)}
                                    type="text"
                                    placeholder="Alex Zen"
                                    className="field-input pl-10"
                                />
                            </div>
                        </div>

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

                        <div className="sm:col-span-2">
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
                                    autoComplete="new-password"
                                    ref={passRef}
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="At least 6 characters"
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

                        <div className="sm:col-span-2">
                            <label className="field-label" htmlFor="adminToken">
                                Admin invite token{" "}
                                <span className="font-normal text-slate-400">(optional)</span>
                            </label>

                            <div className="relative">
                                <LuKeyRound
                                    className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-base text-slate-400"
                                    aria-hidden="true"
                                />

                                <input
                                    id="adminToken"
                                    name="adminInviteToken"
                                    value={adminInviteToken}
                                    onChange={(event) => setAdminInviteToken(event.target.value)}
                                    type="text"
                                    placeholder="Paste your invite token"
                                    className="field-input pl-10"
                                />
                            </div>

                            <p className="field-hint flex items-start gap-1.5">
                                <LuInfo className="mt-0.5 shrink-0 text-xs text-slate-400" aria-hidden="true" />
                                Leave this empty to join as a member. Only admins need the invite token.
                            </p>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        size="lg"
                        loading={loading}
                        iconRight={LuArrowRight}
                        className="btn-auth mt-1 w-full hover:shadow-lg hover:shadow-emerald-600/25"
                    >
                        {loading ? "Creating account..." : "Create account"}
                    </Button>
                </form>

                <div className="my-6 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    <span className="h-px flex-1 bg-line" aria-hidden="true" />
                    Already a member?
                    <span className="h-px flex-1 bg-line" aria-hidden="true" />
                </div>

                <Link to="/auth/login" className="btn btn-secondary w-full">
                    Sign in instead
                    <LuArrowRight className="text-base" aria-hidden="true" />
                </Link>

                <div className="mt-6 flex items-start gap-2 rounded-xl bg-slate-50 px-3.5 py-3 text-[11px] leading-5 text-slate-500">
                    <LuShieldCheck className="mt-0.5 shrink-0 text-sm text-emerald-500" aria-hidden="true" />
                    Passwords are hashed with bcrypt and never stored in plain text.
                </div>
            </div>
        </AuthLayout>
    );
};

export default Signup_Page;

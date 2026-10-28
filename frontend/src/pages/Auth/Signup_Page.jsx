import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthLayout from "../../components/layouts/AuthLayout.jsx";
import AuthError from "../../components/forms/AuthError.jsx";
import ProfilePhotoSelector from "../../components/ProfilePhotoSelector.jsx";
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

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passRef = useRef(null);

    const { updateUser } = useUser();
    const navigate = useNavigate();

    const validate = () => {
        if (!fullName.trim()) {
            nameRef.current?.focus();
            return "Please enter your full name";
        }

        if (!email.trim()) {
            emailRef.current?.focus();
            return "Please enter your email";
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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

        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);

        try {
            // The account has to exist before an image can be uploaded, because
            // the upload endpoint requires an authenticated session.
            const response = await signup_user(fullName, email, password, "", adminInviteToken);
            updateUser(response.user);

            if (profilePic) {
                try {
                    const { imageUrl } = await uploadImg(profilePic);

                    if (imageUrl) {
                        const updated = await update_profile({ profileImageUrl: imageUrl });
                        updateUser(updated.user);
                    }
                } catch {
                    toast.error("Account created, but the profile photo could not be uploaded");
                }
            }

            navigate(getHomeRoute(response.user?.role));
        } catch (signupError) {
            setError(signupError.message || "Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <form
                onSubmit={handleSubmit}
                className="flex h-full w-full flex-col items-center px-4 py-4 md:relative md:z-10 md:justify-center md:py-0"
            >
                <h1 className="text-3xl font-bold text-[#1D4ED8] lg:mb-1 lg:text-4xl 2xl:text-5xl">
                    Create an Account
                </h1>

                <p className="mb-7 text-xs text-gray-600 md:text-lg md:text-gray-700 2xl:mt-4 2xl:text-xl">
                    Join us today by entering your details below
                </p>

                <AuthError message={error} />

                <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

                <div className="grid grid-cols-1 gap-0 md:grid-cols-2 md:gap-4">
                    <div>
                        <label
                            className="text-sm font-semibold md:text-base md:text-gray-700 2xl:text-2xl"
                            htmlFor="fullName"
                        >
                            Enter your full name here
                        </label>

                        <input
                            id="fullName"
                            name="name"
                            autoComplete="name"
                            ref={nameRef}
                            value={fullName}
                            onChange={(event) => setFullName(event.target.value)}
                            type="text"
                            placeholder="Example: Alex Zen"
                            className="mt-0 w-full rounded border-2 border-[#D6E0FF] bg-[#F5F8FF] p-2 text-sm placeholder:text-sm focus:ring-2 focus:ring-[#2979FF] focus:outline-none md:mt-2 md:text-base"
                        />
                    </div>

                    <div>
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
                            className="mt-0 w-full rounded border-2 border-[#D6E0FF] bg-[#F5F8FF] p-2 text-sm placeholder:text-sm focus:ring-2 focus:ring-[#2979FF] focus:outline-none md:mt-2 md:text-base"
                        />
                    </div>

                    <div>
                        <label
                            className="text-sm font-semibold md:text-base md:text-gray-700 2xl:text-2xl"
                            htmlFor="password"
                        >
                            Enter your password here
                        </label>

                        <input
                            id="password"
                            name="password"
                            autoComplete="new-password"
                            ref={passRef}
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            type="password"
                            placeholder="Min 6 characters needed"
                            className="mt-0 w-full rounded border-2 border-[#D6E0FF] bg-[#F5F8FF] p-2 text-sm placeholder:text-sm focus:ring-2 focus:ring-[#2979FF] focus:outline-none md:mt-2 md:text-base"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            className="text-sm font-semibold md:text-base md:text-gray-700 2xl:text-2xl"
                            htmlFor="adminToken"
                        >
                            Enter the admin invite token
                        </label>

                        <input
                            id="adminToken"
                            name="adminInviteToken"
                            value={adminInviteToken}
                            onChange={(event) => setAdminInviteToken(event.target.value)}
                            type="text"
                            placeholder="Leave empty for a member account"
                            className="mt-0 w-full rounded border-2 border-[#D6E0FF] bg-[#F5F8FF] p-2 text-sm placeholder:text-sm focus:ring-2 focus:ring-[#2979FF] focus:outline-none md:mt-2 md:text-base"
                        />
                    </div>
                </div>

                <div className="mb-2 md:mb-3">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded bg-[#1D4ED8] px-4 py-2 font-semibold text-white transition-colors duration-200 hover:bg-[#1E40AF] focus:shadow-outline focus:outline-none disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {loading ? "Creating account..." : "SIGNUP"}
                    </button>
                </div>

                <div className="text-center">
                    <p className="cursor-pointer text-sm text-gray-600 2xl:text-lg">
                        Already have an account?{" "}
                        <Link to="/auth/login" className="font-semibold text-[#1E63E6] hover:text-[#1D4ED8]">
                            <u>Login</u>
                        </Link>
                    </p>
                </div>
            </form>
        </AuthLayout>
    );
};

export default Signup_Page;

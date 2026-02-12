import React, { useRef, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { login_User } from '../../api/userApi.js';
import AuthLayout from '../../components/AuthLayout.jsx'

const Login_Page = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const emailRef = useRef(null);
    const passRef = useRef(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!email.trim()) {
            setError("Please enter your email")
            emailRef.current?.focus()
            setLoading(false)
            return;
        }
        if (!password.trim()) {
            setError("Please enter your password")
            passRef.current?.focus()
            setLoading(false)
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email address")
            setLoading(false)
            return;
        }

        try {
            const data = await login_User(email, password);

            navigate("/api/tasks/dashboard-user-data") //this means, when user login, go to the dashboard page

            setLoading(false);
            console.log("signin success")
        }
        catch (e) {
            setLoading(false);
            setError(e.message || 'Login failed. Please check your credentials.');
        }
    }
    
    return (
        <AuthLayout>
            <div className="px-4 w-full max-w-md mx-auto
                sm:max-w-lg sm:px-6
                md:max-w-2xl
                xl:max-w-3xl
                2xl:max-w-4xl"
            >
                <h2
                    className="
                    text-3xl font-bold text-[#1D4ED8] text-center
                    md:text-3xl
                    lg:text-left lg:text-4xl lg:mb-1
                    2xl:text-5xl"
                > Welcome Back </h2>

                <h6
                    className="
                    text-gray-600 mb-8 text-center
                    md:text-md md:text-gray-700
                    lg:text-left
                    2xl:text-xl 2xl:mt-4"
                > Please enter your details to login </h6>

                {error && (
                    <div className="mb-4 p-2 sm:p-3 bg-[#FFF1F2] text-[#E11D48] border border-[#FECDD3] rounded-md">
                        {error}
                    </div>
                )}

                <div className="mb-4">
                    <label
                        className="
                        text-sm font-semibold
                        md:text-md md:text-gray-700
                        2xl:text-2xl"
                        htmlFor="email"
                    >
                        Enter your email address
                    </label>

                    <input
                        ref={emailRef}
                        value={email}
                        onInput={(c) => setEmail(c.target.value)}
                        type="email"
                        placeholder="Example: alex@example.com"
                        className="
                        mt-2 w-full p-2 rounded
                        text-sm md:text-base
                        placeholder:text-sm md:placeholder:text-base
                        bg-[#F5F8FF] border-2 border-[#D6E0FF]
                        focus:outline-none focus:ring-2 focus:ring-[#2979FF]"
                    />
                </div>

                <div className="mb-4">
                    <label
                        className="
                        text-sm font-semibold
                        md:text-md md:text-gray-700
                        2xl:text-2xl"
                        htmlFor="password"
                    >
                        Enter your password here
                    </label>

                    <input
                        ref={passRef}
                        value={password}
                        onInput={(c) => setPassword(c.target.value)}
                        type="password"
                        placeholder="Minimum 8 characters needed"
                        className="
                        mt-2 w-full p-2 rounded
                        text-sm md:text-base
                        placeholder:text-sm md:placeholder:text-base
                        bg-[#F5F8FF] border-2 border-[#D6E0FF]
                        focus:outline-none focus:ring-2 focus:ring-[#2979FF]"
                    />
                </div>

                <div className="mb-3">
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="
                        w-full py-2 px-4 rounded
                        font-semibold text-white
                        bg-[#1D4ED8] hover:bg-[#1E40AF]
                        transition-colors duration-200
                        focus:outline-none focus:shadow-outline"
                    >
                        {loading ? "ᯓ ✈︎" : "LOGIN"}
                    </button>
                </div>

                <div className="text-center">
                    <p className="cursor-pointer text-sm text-gray-600 2xl:text-lg">
                        Don't have an account?{" "}
                        <Link to={"/auth/signup"} className="text-[#1E63E6] hover:text-[#1D4ED8] font-semibold">
                            <u>SignUp</u>
                        </Link>
                    </p>
                </div>
            </div>
        </AuthLayout>
    )
}

export default Login_Page
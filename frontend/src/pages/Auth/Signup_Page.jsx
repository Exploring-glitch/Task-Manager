import React, { useContext, useRef, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { signup_User } from '../../api/userApi.js';
import AuthLayout from '../../components/AuthLayout.jsx'
import ProfilePhotoSelector from '../../components/ProfilePhotoSelector.jsx';
import { UserContext } from '../../context/userContext.jsx';
import { uploadImg } from '../../util/uploadImg.jsx';

const Signup_Page = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [adminInviteToken, setAdminInviteToken] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passRef = useRef(null);
    const adminTokenRef = useRef(null);

    const { updateUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        let profileImageUrl = '';

        if (!fullName) {
            setError("Please enter your full name")
            nameRef.current?.focus()
            setLoading(false)
            return;
        }
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
        if (password.length < 6) {
            setError('Password must contain at least 6 characters');
            setLoading(false)
            return;
        }

        //signup API call
        try {
            if(profilePic){
                const imgUploadResponse = await uploadImg(profilePic);

                profileImageUrl = imgUploadResponse.imageUrl || "";
            }

            const response = await signup_User(fullName, email, password, profileImageUrl, adminInviteToken);
            const { token } = response;

            if (token) {

                updateUser(response);

                if (response.user.role == "member") {
                    navigate("/api/tasks/dashboard-user-data") //this means, when user login, go to the dashboard page
                    setLoading(false);
                } else {
                    navigate("/api/tasks/dashboard") //this means, when user login, go to the dashboard page (only accessible for admins)
                    setLoading(false);
                }
            }
        }
        catch (e) {
            setLoading(false);
            setError(e.message || 'Login failed. Please check your credentials.');
        }
    }

    return (
        <AuthLayout>
            <form onSubmit={handleSubmit}
                className="w-full h-full px-4 py-4 
                flex flex-col items-center
                md:py-0 md:justify-center md:relative md:z-10"
            >
                <h2
                    className="
                    text-3xl font-bold text-[#1D4ED8]
                    sd:text-4xl
                    lg:text-4xl lg:mb-1
                    2xl:text-5xl"
                > Create an Account </h2>

                <h6
                    className="
                    text-gray-600 text-xs mb-7
                    md:text-gray-700 md:text-lg
                    2xl:text-xl 2xl:mt-4"
                > Join us today by entering your details below </h6>

                {error && (
                    <div className="mb-4 p-2 sm:p-3 bg-[#FFF1F2] text-[#E11D48] border border-[#FECDD3] rounded-md">
                        {error}
                    </div>
                )}

                <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

                <div className='grid grid-col-1 gap-0
                    md:grid-cols-2 md:gap-4'
                >
                    <div>
                        <label
                            className="
                            text-sm font-semibold
                            md:text-md md:text-gray-700
                            2xl:text-2xl"
                            htmlFor="fullName"
                        >
                            Enter your full name here
                        </label>

                        <input
                            ref={nameRef}
                            value={fullName}
                            onInput={(c) => setFullName(c.target.value)}
                            type="type"
                            placeholder="Example: Alex Zen"
                            className="
                            mt-0 md:mt-2 w-full p-2 rounded
                            text-sm md:text-base
                            placeholder:text-sm md:placeholder:text-sm
                            bg-[#F5F8FF] border-2 border-[#D6E0FF]
                            focus:outline-none focus:ring-2 focus:ring-[#2979FF]"
                        />
                    </div>

                    <div>
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
                            mt-0 md:mt-2 w-full p-2 rounded
                            text-sm md:text-base
                            placeholder:text-sm md:placeholder:text-sm
                            bg-[#F5F8FF] border-2 border-[#D6E0FF]
                            focus:outline-none focus:ring-2 focus:ring-[#2979FF]"
                        />
                    </div>

                    <div>
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
                            placeholder="Min 6 characters needed"
                            className="
                            mt-0 md:mt-2
                            w-full p-2 rounded text-sm 
                            placeholder:text-sm md:placeholder:text-sm
                            bg-[#F5F8FF] border-2 border-[#D6E0FF]
                            focus:outline-none focus:ring-2 focus:ring-[#2979FF]"
                        />
                    </div>

                    <div className='mb-4'>
                        <label
                            className="
                            text-sm font-semibold
                            md:text-md md:text-gray-700
                            2xl:text-2xl"
                            htmlFor="adminToken"
                        >
                            Enter the admin invite token
                        </label>

                        <input
                            ref={adminTokenRef}
                            value={adminInviteToken}
                            onInput={(c) => setAdminInviteToken(c.target.value)}
                            type="text"
                            placeholder="6 Digit Code"
                            className="
                            mt-0 md:mt-2 w-full p-2 rounded
                            text-sm md:text-base
                            placeholder:text-sm md:placeholder:text-sm
                            bg-[#F5F8FF] border-2 border-[#D6E0FF]
                            focus:outline-none focus:ring-2 focus:ring-[#2979FF]"
                        />
                    </div>
                </div>

                <div className="mb-2 md:mb-3">
                    <button
                        type='submit'
                        disabled={loading}
                        className="
                        w-full py-2 px-4 rounded
                        font-semibold text-white
                        bg-[#1D4ED8] hover:bg-[#1E40AF]
                        transition-colors duration-200
                        focus:outline-none focus:shadow-outline"
                    >
                        {loading ? "ᯓ ✈︎" : "SIGNUP"}
                    </button>
                </div>

                <div className="text-center">
                    <p className="cursor-pointer text-sm text-gray-600 2xl:text-lg">
                        Already have an account?{" "}
                        <Link to={"/auth/login"} className="text-[#1E63E6] hover:text-[#1D4ED8] font-semibold">
                            <u>Login</u>
                        </Link>
                    </p>
                </div>
            </form>
        </AuthLayout>
    )
}

export default Signup_Page
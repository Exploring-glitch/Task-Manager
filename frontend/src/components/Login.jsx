import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { login_User } from '../api/userApi.js';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError("Please enter a valid email address")
        setLoading(false)
        return;
      }
      if (!password) {
        setError("Please enter the password")
        setLoading(false)
        return;
      }

      const data = await login_User(email, password);
      console.log(data)

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
    <div className='mt-40 p-2 w-2xl'>
      <h2 className="text-3xl font-bold text-[#1E63E6]">Welcome Back</h2>
      <h6 className='text-gray-600 mb-8'>Please enter your details to login</h6>

      {error && (
        <div className="mb-4 p-2 sm:p-3 bg-[#FFF1F2] text-[#E11D48] border border-[#FECDD3] rounded-md">
          {error}
        </div>
      )}

      <div className='mb-4'>
        <label className="text-sm font-semibold" htmlFor="email"> Enter your email adress </label>
        <input
          value={email}
          onInput={(c) => { setEmail(c.target.value) }}
          type="email" placeholder='Example: alex@example.com'
          className='mt-2 placeholder:text-sm text-sm bg-[#F5F8FF] border-2 border-[#D6E0FF] rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-[#2979FF]'
        />
      </div>

      <div className='mb-4'>
        <label className="text-sm font-semibold" htmlFor="password"> Enter your password here </label>
        <input
          value={password}
          onInput={(c) => { setPassword(c.target.value) }}
          type="password" placeholder='Minimum 8 characters needed'
          className='mt-2 placeholder:text-sm text-sm bg-[#F5F8FF] border-2 border-[#D6E0FF] rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-[#2979FF]'
        />
      </div>

      <div className="mb-3">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-[#1D4ED8] hover:bg-[#1E40AF] text-white cursor-pointer transition-colors duration-200 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          {loading ? 'ᯓ ✈︎' : 'LOGIN'}
        </button>
      </div>

      <div className="text-center">
        <p className="cursor-pointer text-sm text-gray-600">
          Don't have an account? <Link className="text-[#1E63E6] hover:text-[#1D4ED8] font-semibold"><u>SignUp</u></Link>
        </p>
      </div>
    </div>
  )
}

export default Login
import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try{

    } 
    catch(e){
      setLoading(false);
      setError(e.message || 'Login failed. Please check your credentials.');
    }
  }

  return (
    <div>
      <div className='p-2 w-2xl'>
        <h2 className="text-3xl font-bold text-[#1E63E6]">Welcome Back</h2>
        <h6 className='text-gray-600 mb-8'>Please enter your details to login</h6>

        {error && (
          <div className="mb-4 p-2 sm:p-3 bg-[#2B0D0D] text-[#FF6B6B] rounded-md">
            {error}
          </div>
        )}

        <div className='mb-4'>
          <label className="text-sm font-semibold" htmlFor="email"> Enter your email here </label>
          <input
            value={email}
            onInput={(c) => { setEmail(c.target.value) }}
            type="email" placeholder='Example: alex@example.com'
            className='placeholder:text-sm border rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-[#2979FF]'
          />
        </div>

        <div className='mb-4'>
          <label className="text-sm font-semibold" htmlFor="password"> Enter your password here </label>
          <input
            value={password}
            onInput={(c) => { setPassword(c.target.value) }}
            type="password" placeholder='Minimum 8 characters needed'
            className='placeholder:text-sm border rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-[#2979FF]'
          />
        </div>

        <div className="">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#1D4ED8] hover:bg-[#1E63E6] text-white cursor-pointer transition-colors duration-200 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            {loading ? 'Logging in..' : 'LOGIN'}
          </button>
        </div>

        <div className="text-center mt-3">
          <p className="cursor-pointer text-sm text-gray-600">
            Don't have an account? <span className="text-[#1E63E6] hover:text-[#1D4ED8] font-semibold"><u>SignUp</u></span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
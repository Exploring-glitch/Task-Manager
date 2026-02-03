import React, { useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  function handleSubmit() {

  }

  return (
    <div>
      <div className='p-3 border-black border-2 w-80'>
        <h2 className="text-center underline text-lg font-bold mb-6">Login</h2>

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
            type="email" placeholder='example: alex@gmail.com'
            className='border rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-[#2979FF]'
          />
        </div>

        <div className='mb-4'>
          <label className="text-sm font-semibold" htmlFor="password"> Enter your password here </label>
          <input
            value={password}
            onInput={(c) => { setPassword(c.target.value) }}
            type="email" placeholder='example: **********'
            className='border rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-[#2979FF]'
          />
        </div>

        <div className="">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#2979FF] hover:bg-[#1E63E6] text-white transition-colors duration-200 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            {loading ? 'Logging in..' : 'Login'}
          </button>
        </div>

        <div className="text-center mt-3">
          <p className="cursor-pointer text-sm text-gray-600">
            Don't have an account? <span className="text-[#2979FF] hover:text-[#2168ec]"><u>Sign Up</u></span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
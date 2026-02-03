import React from 'react'
import Login from '../../components/Login.jsx'

const LoginPage = () => {
  return (
    <div className='p-3'>
      <h2 className="text-lg font-bold mb-6">Task Manager</h2>
      <div className='mt-52'>
        <Login />
      </div>
    </div>
  )
}

export default LoginPage
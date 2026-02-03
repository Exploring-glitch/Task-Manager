import React from 'react'
import Login from '../../components/Login.jsx'

const LoginPage = () => {
  return (
    <div className='p-3'>
      <h2 className="text-lg font-bold mb-6">Task Manager</h2>

      
      <div className='flex gap-20'>
        <Login />
        <img src="https://i.pinimg.com/736x/82/16/34/82163432e70009ce3c4707ec7e36f4e1.jpg" alt="" 
          className=''
        />
      </div>
    </div>
  )
}

export default LoginPage
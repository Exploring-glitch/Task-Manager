import React from 'react'
import Login from '../../components/Login.jsx'
import Header from '../../components/Header.jsx'

const LoginPage = () => {
  return (
    <div className='bg-[#F8FAFC]'>
      <Header />
    
      <div className='p-15 flex gap-20'>
        <Login />
        <img src="https://i.pinimg.com/736x/82/16/34/82163432e70009ce3c4707ec7e36f4e1.jpg" alt="" 
          className=''
        />
      </div>
    </div>
  )
}

export default LoginPage
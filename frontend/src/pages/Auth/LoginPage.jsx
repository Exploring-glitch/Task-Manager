import React from 'react'
import Login from '../../components/Login.jsx'
import Header from '../../components/Header.jsx'

const LoginPage = () => {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <Header />

      <div className="p-4 sm:p-8 md:p-15 flex flex-col md:flex-row gap-10 md:gap-20 items-center justify-center">
        <Login />

        <img
          src="https://i.pinimg.com/736x/82/16/34/82163432e70009ce3c4707ec7e36f4e1.jpg"
          alt=""
          className="hidden lg:block w-full md:max-w-md lg:max-w-lg xl:max-w-3xl rounded-lg"
        />
      </div>
    </div>
  )

}

export default LoginPage
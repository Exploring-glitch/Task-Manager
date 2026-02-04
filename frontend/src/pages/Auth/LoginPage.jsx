import React from 'react'
import Login from '../../components/Login.jsx'
import Header from '../../components/Header.jsx'

const LoginPage = () => {
  return (
    <div className="bg-linear-to-br from-[#F8FAFC] via-[#EEF4FF] to-[#E8F0FF] min-h-screen">
      <Header />

      <div className="p-4 flex flex-col gap-10 items-center justify-center
        sm:p-8
        md:p-7 md:flex-row md:gap-1">

        <Login />
        
        <img
          src="https://i.pinimg.com/736x/82/16/34/82163432e70009ce3c4707ec7e36f4e1.jpg"
          alt=""
          className="hidden bg-[#EEF4FF] mix-blend-multiply w-full rounded-lg
            md:block md:max-w-md 
            lg:max-w-lg 
            xl:max-w-3xl"
        />
      </div>
    </div>
  )

}

export default LoginPage
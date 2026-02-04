import React from 'react'
import Login from '../../components/Login.jsx'
import Header from '../../components/Header.jsx'

const LoginPage = () => {
  return (
    <div className="bg-linear-to-br from-[#F8FAFC] via-[#EEF4FF] to-[#E8F0FF] min-h-screen">
      <Header />

      <div className="p-4 flex items-center justify-center relative min-h-[calc(100vh-64px)] 
        sm:p-8
        md:p-7
        lg:hidden"
      >
        <img
          src="https://i.pinimg.com/736x/82/16/34/82163432e70009ce3c4707ec7e36f4e1.jpg"
          alt=""
          className="hidden bg-[#EEF4FF] mix-blend-multiply w-full rounded-lg
              md:block md:absolute md:inset-0 md:bg-center md:bg-no-repeat md:bg-contain md:mt-10"
        />
        <div className="hidden md:block absolute inset-0 bg-white/20 backdrop-blur-sm" /> {/*for background blurring in md*/}
        <div className='relative z-10'>
          <Login />
        </div>
      </div>

      <div className="hidden lg:block h-full pl-5">
        <div className="flex h-full">

          <div className="relative w-1/2 mt-72
            xl:mt-80"
          >
            <Login />
          </div>

          <div className="">
            <img
              src="https://i.pinimg.com/736x/82/16/34/82163432e70009ce3c4707ec7e36f4e1.jpg"
              alt=""
              className="absolute mt-20 max-w-md bg-[#EEF4FF] mix-blend-multiply
              xl:max-w-xl
              2xl:max-w-2xl"
            />
          </div>

        </div>
      </div>

    </div>
  )

}

//xl:max-w-3xl
export default LoginPage
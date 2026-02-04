import React from 'react'
import Login from '../../components/Login.jsx'
import Header from '../../components/Header.jsx'

const LoginPage = () => {
  return (
    <div className="bg-linear-to-br from-[#F8FAFC] via-[#EEF4FF] to-[#E8F0FF] min-h-screen overflow-hidden">
      <Header />

      <div className="p-4 flex items-center justify-center relative min-h-[calc(100vh-64px)] 
        sm:p-8
        lg:hidden"
      >
        <img
          src="https://i.pinimg.com/736x/82/16/34/82163432e70009ce3c4707ec7e36f4e1.jpg"
          alt=""
          className="hidden bg-[#EEF4FF] mix-blend-multiply w-full rounded-lg
              md:block md:absolute md:inset-0 md:bg-center md:bg-no-repeat md:bg-contain"
        />
        <div className="hidden md:block absolute inset-0 bg-white/20 backdrop-blur-sm" /> {/*for background blurring in md*/}
        <div className='relative z-10'>
          <Login />
        </div>
      </div>

      <div className="hidden lg:block pl-5">
        <div className="flex
          lg:gap-16
          xl:gap-5
        ">

          <div className="relative max-w-md mt-20
          xl:mt-60"
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
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
        lg:flex lg:flex-row lg:gap-2
        ">
          <img
            src="https://i.pinimg.com/736x/82/16/34/82163432e70009ce3c4707ec7e36f4e1.jpg"
            alt=""
            className="hidden bg-[#EEF4FF] mix-blend-multiply w-full rounded-lg
              md:block md:absolute md:inset-0 md:bg-center md:bg-no-repeat md:bg-contain md:mt-10
              lg:max-w-lg 
              xl:max-w-3xl"
          />

          {/*for background blurring in md*/}
          <div className="hidden 
            md:block absolute inset-0 bg-white/30 backdrop-blur-sm 
            lg:hidden" 
          /> 

          <div className='md:relative md:z-10'>
            <Login />
          </div>
      </div>
    </div>
  )

}

export default LoginPage
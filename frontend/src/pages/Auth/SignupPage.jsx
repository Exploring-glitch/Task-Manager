import React from 'react'
import Header from '../../components/Header.jsx'
import Signup from '../../components/Signup.jsx'

const SignupPage = () => {
  return (
    <div className="bg-linear-to-br from-[#F8FAFC] via-[#EEF4FF] to-[#E8F0FF] min-h-screen overflow-hidden">
    <Header />

    <div className="relative min-h-[calc(100vh-64px)] p-4 sm:p-8">

    
      <img
        src="https://i.pinimg.com/736x/82/16/34/82163432e70009ce3c4707ec7e36f4e1.jpg"
        alt=""
        className="
          hidden md:block
          bg-[#EEF4FF] mix-blend-multiply

          /* md: background-style */
          md:absolute md:inset-0 md:bg-center md:bg-no-repeat md:bg-contain

          /* lg and above: fixed right */
          lg:fixed lg:inset-auto lg:top-0 lg:right-0
          lg:h-screen lg:bg-cover
          lg:w-[50%] xl:w-[43%]
        "
      />

      {/* Image blurring (md only) */}
      <div className="hidden md:block lg:hidden absolute inset-0 bg-white/20 backdrop-blur-sm" />

      {/* Signup form */}
      <div
        className="
          relative z-10
          flex items-center justify-center min-h-[calc(100vh-64px)] 

          /* lg positioning */
          lg:block
          lg:ml-20
          lg:max-w-md
          lg:mr-[50%]
          xl:mt-44
        "
      >
        <Signup />
      </div>

    </div>
  </div>
  )

}


export default SignupPage
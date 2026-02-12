import React from 'react'

const AuthLayout = ({ children }) => {
  return (
    <div className='min-h-[calc(100vh-64px)] w-screen overflow-hidden {/*min-h-[calc(100vh-64px)] means take the full height of the screen except the navbar (whose height is 64px*/}
      bg-linear-to-br from-[#F8FAFC] via-[#EEF4FF] to-[#E8F0FF]'> 

      <div className='h-full w-full lg:w-1/2'>
        {children}
      </div>

      <div>
        <img
          src="https://i.pinimg.com/736x/82/16/34/82163432e70009ce3c4707ec7e36f4e1.jpg"
          alt=""
          className="
          hidden md:block
          mix-blend-multiply 
          
          md:fixed {/*(blur and centralized)*/}
          md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 
          md:w-[60vw] md:h-[60vh] md:object-cover  
          md:blur-sm
        
          lg:blur-none lg:fixed lg:top-0 lg:right-0 
          lg:translate-x-0 lg:translate-y-0
          lg:h-screen lg:w-[50%]"
        />
      </div>

    </div>
  )
}

export default AuthLayout
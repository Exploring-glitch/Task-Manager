import React from 'react'

const AuthLayout = ({ children }) => {
  return (
    <div className='w-screen h-full overflow-hidden bg-linear-to-br from-[#F8FAFC] via-[#EEF4FF] to-[#E8F0FF]'>
      <div className='w-1/2'>
        
        {children}
      
      </div>

      <div>
        <img
          src="https://i.pinimg.com/736x/82/16/34/82163432e70009ce3c4707ec7e36f4e1.jpg"
          alt=""
          className="
          hidden md:block
          mix-blend-multiply 
          
          md:fixed
          md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 
          md:h-[50vh] md:w-auto
        

          lg:fixed lg:top-0 lg:right-0 lg:left-auto
          lg:translate-x-0 lg:translate-y-0
          lg:h-screen w-[50%]"
        />
      </div>
    </div>
  )
}

export default AuthLayout
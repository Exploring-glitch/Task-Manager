import React from 'react'

const AuthLayout = ({ children }) => {
  return (
    <div className='w-screen h-full overflow-hidden'>
      <div className=''>
        {children}
      </div>

      <div>
        <img
          src="https://i.pinimg.com/736x/82/16/34/82163432e70009ce3c4707ec7e36f4e1.jpg"
          alt=""
          className="
          hidden sm:block
          mix-blend-multiply 
          
          sm:object-cover
          sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 
          sm:h-[50%] sm:w-[50%]
          
          md:h-[60%] md:w-[60%]

          lg:fixed lg:top-90 lg:right-
          lg:h-screen
          lg:w-1/2 xl:w-[43%]"
        />
      </div>
    </div>
  )
}

export default AuthLayout
import React from 'react'

const AuthLayout = ({ children }) => {
  return (
    <>
        <div className='h-screen w-screen'>
            <div className=''>
                <h2 className='text-bold text-lg'>Task Manager</h2>
                {children}
            </div>
        </div>
    </>
  )
}

export default AuthLayout
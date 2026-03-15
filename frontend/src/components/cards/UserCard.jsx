import React from 'react'

const UserCard = ({ userInfo }) => {

    return (
        <div className='bg-white p-4 rounded-xl shadow-md shadow-gray-100 border-2 border-gray-200/50'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <img 
                        src={userInfo?.profileImageUrl}
                        alt={`Avatar`}
                        className='w-12 h-12 rounded-full border-2 border-white'
                    />

                    <div>
                        <p className='text-sm font-medium'> {userInfo?.name} </p>
                        <p className='text-xs text-gray-500'> {userInfo?.email} </p>
                    </div>
                </div>
            </div>

            <div className='flex item-end gap-3 mt-5'>
            </div>
        </div>
    )
}

export default UserCard;
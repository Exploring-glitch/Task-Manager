import React from 'react'

const DeleteAlert = ({ content, onDelete }) => {
  return (
    <div>
        <p className='text-sm'> {content} </p>

        <div className='flex justify-end mt-5'>
            <button
                type='button'
                onClick={onDelete}
                className='flex items-center justify-center text-xs md:text-sm font-medium text-rose-500 whitespace-nowrap bg-rose-50 border border-rose-100 rounded-md px-4 py-1.5 cursor-pointer transition hover:border-rose-200 '
            > Delete </button>
        </div>
    </div>
  )
}

export default DeleteAlert;
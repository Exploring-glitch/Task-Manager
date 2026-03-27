import React from 'react'

const DeleteAlert = ({ content, onConfirm, btnText, onCancel }) => {
  return (
    <div>
      <p className='text-sm'> {content} </p>

      <div className='flex justify-end mt-5 md:mt-3'>

        {onCancel && (
          <button
            type='button'
            onClick={onCancel}
            className='text-xs md:text-sm text-gray-500 px-3 py-1.5'
          >
            Cancel
          </button>
        )}

        <button
          type='button'
          onClick={onConfirm}
          className='flex items-center justify-center text-xs md:text-sm font-medium text-rose-500 whitespace-nowrap bg-rose-50 border border-rose-100 rounded-md px-4 py-1.5 cursor-pointer transition hover:border-rose-200 '
        > {btnText} </button>
      </div>
    </div>
  )
}

export default DeleteAlert;
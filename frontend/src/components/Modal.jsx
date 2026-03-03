import React from 'react'

const Modal = ({ children, isOpen, onClose, title }) => {

    if (!isOpen) {
        return;
    }


    return (
        <div className='fixed top-12 right-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden bg-gray-950/50'>
            <div className='relative p-4 w-full max-w-2xl max-h-full'>

                <div className='relative h-[60vh] bg-white rounded-lg shadow-lg dark:bg-gray-700 max-h-full max-w-full'>
                    
                    <div className='flex items-center justify-between p-4 border-b border-gray-200 rounded-t dark:border-gray-600 
                        md:p-5
                    '>
                        <h3 className='text-lg text-gray-900 dark:text-white'> {title} </h3>

                        <button
                            type='button'
                            onClick={onClose}
                            className='text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center cursor-pointer hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white'
                        >
                            <svg
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill='none'
                                viewBox='0 0 14 14'
                                className='w-3 h-3'
                            >
                                <path
                                    stroke='currentColor'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d="M1 1l12 12M13 1L1 13"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>

                <div className='p-4 md:p-5 space-y-4'> {children} </div>

            </div>
        </div>
    )
}

export default Modal
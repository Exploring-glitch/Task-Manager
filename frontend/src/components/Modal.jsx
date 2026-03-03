import React from 'react'

const Modal = ({ children, isOpen, onClose, title }) => {

    if(!isOpen){
        return;
    }


    return (
        <div className='fixed right-0 top-0 z-50 flex justify-center items-center w-full h-[calc(100vh-52px)] overflow-y-auto overflow-x-hidden'>
            <div className='relative p-4 w-full max-w-2xl max-h-full'>

                <div className=''>
                    <h3 className=''> {title} </h3>

                    <button
                        type='button'
                        onClick={onClose}
                        className=''
                    >
                        <svg 
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill='none'
                            viewBox='0 0 14 14'
                            className=''
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
                
                <div className=''> {children} </div>

            </div>
        </div>
    )
}

export default Modal
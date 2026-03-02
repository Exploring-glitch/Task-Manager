import React from 'react'

const Modal = ({ children, isOpen, onClose, title }) => {

    if(!isOpen){
        return;
    }


    return (
        <div className='bg-black-100/20 bg-opacity-50 fixed right-0 top-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden'>
            <div className=''>

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
                                d='m1 1 6 6m0 0 6 6M7 716-6M7 71-6 6'
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
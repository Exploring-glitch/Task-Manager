import React, { useState } from 'react';
import { LuChevronDown } from 'react-icons/lu';


const SelectDropDown = ({ options, value, onChange, placeholder }) => {
    const [isOpen, setIsopen] = useState(false);

    const handleSelect = (option) => {
        onChange(option);
        setIsopen(false);
    }



    return (
        <div className='relative w-full'>
            <button 
                onClick={() => setIsopen(!isOpen)}
                className='w-full mt-2 flex justify-between items-center text-sm text-black outline-none bg-white border border-slate-100 px-2.5 py-3 rounded-md'
            >
                {value ? options.find((opt) => opt.value === value)?.label : placeholder}
                <span className='ml-2'> {isOpen ? <LuChevronDown classNarotate-180me=''/> : <LuChevronDown className=''/> } </span>
            </button>

            {isOpen && (
                <div className='absolute z-10 mt-1 w-full bg-white border border-slate-100 rounded-md shadow-lg'>
                    {options.map((option) => (
                        <div
                            key={option.value}
                            onClick={() => handleSelect(option.value)}
                            className='px-3 py-2 text-sm cursor-pointer hover-bg-gray=100'
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SelectDropDown
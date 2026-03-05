import React, { useState } from 'react'
import { HiMiniPlus, HiOutlineTrash } from "react-icons/hi2";
import { LuPaperclip, LuTypeOutline } from 'react-icons/lu';



const AddAttachmentInput = ({ attachments, setAttachments }) => {
    const [option, setOption] = useState("");

    //Function to handle adding an option
    const handleAddOption = () => {
        if (option.trim()) {
            setAttachments([...attachments, option.trim()]);
            setOption("");
        }
        else{
            return;
        }
    }

    //Function to handle deleting an option
    const handleDeleteOption = (index) => {
        const updatedArr = attachments.filter((_, idx) => idx !== index);
        setAttachments(updatedArr);
    }


    return (
        <div>
            {attachments.map((item, index) => (
                <div 
                    key={index}
                    className='mb-3 mt-2 flex justify-between px-3 py-2 bg-gray-50 border border-gray-100 rounded-md'
                >
                    <div className='flex-1 flex items-center gap-3 border-gray-100'>
                        <LuPaperclip className='text-gray-400' />
                        <p className='text-xs text-black'>{item}</p>
                    </div>

                    <button 
                        onClick={() => {handleDeleteOption(index)}}
                        className='cursor-pointer'
                    >
                        <HiOutlineTrash  className='text-lg text-red-500' />
                    </button>
                </div>
            ))}

            <div className='flex items-center gap-5 mt-4'>
                <div className='flex-1 flex items-center gap-3 border border-gray-100 rounded-md px-3'>
                    <LuPaperclip className='text-gray-400' />

                    <input 
                        type="text" 
                        placeholder='Add File Link'
                        value={option}
                        onChange={( {target} ) => setOption(target.value)}
                        className='py-2 w-full text-[13px] text-black outline-none bg-white'
                    />
                </div>

                <button 
                    onClick={handleAddOption}
                    className='text-nowrap flex items-center text-[12px] font-medium
                    text-gray-700 hover:text-primary bg-gray-50 hover:bg-blue-50
                    px-4 pr-5 py-1.5 rounded-lg border border-gray-300/50 cursor-pointer'
                >
                    <HiMiniPlus className='text-[16px] mr-2'/> <span className='text-[13px]'> Add </span> 
                </button>
            </div>
        </div>
    )
}

export default AddAttachmentInput;
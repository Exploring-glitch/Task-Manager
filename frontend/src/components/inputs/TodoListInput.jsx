import React, { useRef, useState } from 'react'
import { HiMiniPlus, HiOutlineTrash } from "react-icons/hi2";


const TodoListInput = ({ todolist, setTodoList }) => {
    const inputRef = useRef(null);

    const [option, setOption] = useState("");

    //Function to handle adding an option
    const handleAddOption = () =>{
        if(option.trim()){
            setTodoList([...todolist, option.trim()]);
            setOption("");
        } 
        else{
            inputRef.current.focus();   
            return;
        }
    };

    //Function to handle deleting an option
    const handleDeleteOption = (index) =>{
        const updatedArr = todolist.filter((_, idx) => idx !== index);
        setTodoList(updatedArr);
    }


    return (
        <div>
            {todolist.map((item,index) => (
                <div
                    key={index}
                    className='mb-3 flex justify-between px-3 py-2 rounded-md border border-gray-100 bg-gray-50'
                >
                    <p className='text-xs text-black'>
                       <span className='text-xs text-gray-400 font-semibold mr-2'>
                            {index < 9 ? `0${index + 1}` : index + 1}
                        </span> 
                        {item}
                    </p>

                    <button 
                        onClick={() => { handleDeleteOption(index); }}
                        className='cursor-pointer'
                    >
                        <HiOutlineTrash className='text-lg text-red-500' />
                    </button>
                </div>
            ))}

            <div className='flex items-center gap-5 mt-4' >
                <input
                    ref={inputRef}
                    type='text'
                    placeholder='Enter Task'
                    value={option}
                    onChange={( {target} ) => setOption(target.value)}
                    className='w-full text-[13px] text-black outline-none bg-white border border-gray-100 px-3 py-1.5 focus:ring-1 focus:ring-gray-200'
                />

                <button 
                    onClick={handleAddOption}
                    className='flex items-center text-[12px] font-medium
                    text-gray-700 hover:text-primary bg-gray-50 hover:bg-blue-50
                    px-4 pr-5 py-1.5 rounded-lg border border-gray-300/50 cursor-pointer'
                >
                    <HiMiniPlus className='text-[16px] mr-2' /> <span className='text-[13px]'> Add </span> 
                </button>
            </div>
        </div>
    )
}

export default TodoListInput
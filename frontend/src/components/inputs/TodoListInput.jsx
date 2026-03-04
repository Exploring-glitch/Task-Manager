import React, { useState } from 'react'
import { HiMiniPlus, HiOutlineTrash } from "react-icons/hi2";


const TodoListInput = ({ todolist, setTodoList }) => {
    const [option, setOption] = useState("");

    //Function to handle adding an option
    const handleAddOption = () =>{
        if(option.trim()){
            setTodoList([...todolist, option.trim()]);
            setOption("");
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
                    key={item}
                    className=''
                >
                    <p className=''>
                       <span className=''>
                            {index < 9 ? `0${index + 1}` : index + 1}
                        </span> 
                    </p>

                    <button 
                        onClick={() => { handleDeleteOption(index); }}
                        className=''
                    >
                        <HiOutlineTrash className='' />
                    </button>
                </div>
            ))}

            <div className='' >
                <input
                    type='text'
                    placeholder='Enter Task'
                    value={option}
                    onChange={( {target} ) => setOption(target.value)}
                    className=''
                />

                <button 
                    onClick={handleAddOption}
                    className=''
                >
                    <HiMiniPlus className='' /> Add
                </button>
            </div>
        </div>
    )
}

export default TodoListInput
import React, { useState } from 'react'
import { get_all_users } from '../../api/userApi.js';

const SelectUsers = ({ selectedUsers, setSelectedUsers }) => {
    const [allUsers, setAllUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tempSelectedUsers, setTempSelectedUsers] = useState([]);

    const getAllUsers = async () => {
        try{
            const response = await get_all_users();
            console.log(response)
            if(response?.length > 0){
                setAllUsers(response)
            }
        }
        catch(e){
            console.log("Error fetching users.Error:", e);
        }
    }


    return (
        <div>
            <button className='border border-amber-400' onClick={() => getAllUsers()}>hello</button>
        </div>
    )
}

export default SelectUsers
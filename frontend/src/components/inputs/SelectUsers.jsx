import React, { useEffect, useState } from 'react'
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

    const toggleUserSelection = (userId) => {
        setTempSelectedUsers((prev) => 
            prev.includes(userId) 
            ? prev.filter((id) => id !== userId) 
            : [...prev, userId]
        );
    };

    const handleAssign = () => {
        setSelectedUsers(tempSelectedUsers);
        setIsModalOpen(false);
    };

    const selectedUserAvatars = allUsers.filter((user) => selectedUsers.includes(user._id)).map((user) => user.profileImageUrl);

    useEffect(() => {
        getAllUsers();
    }, []);

    useEffect(() => {
        if(selectedUsers.length === 0){
            setTempSelectedUsers([]);
        }
        return () => {};
    }, [selectedUsers]);


    

    return (
        <div>
            <button className='border border-amber-400' onClick={() => getAllUsers()}>hello</button>
        </div>
    )
}

export default SelectUsers
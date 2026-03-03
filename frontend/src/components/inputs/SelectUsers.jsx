import React, { useEffect, useState } from 'react'
import { get_all_users } from '../../api/userApi.js';
import { LuUsers } from 'react-icons/lu';
import Modal from '../Modal.jsx';

const SelectUsers = ({ selectedUsers, setSelectedUsers }) => {
    const [allUsers, setAllUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [tempSelectedUsers, setTempSelectedUsers] = useState([]);

    const getAllUsers = async () => {
        try {
            const response = await get_all_users();
            console.log(response)
            if (response?.length > 0) {
                setAllUsers(response)
            }
        }
        catch (e) {
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
        if (selectedUsers.length === 0) {
            setTempSelectedUsers([]);
        }
        return () => { };
    }, [selectedUsers]);




    return (
        <div>
            {selectedUserAvatars.length === 0 && (
                <button
                    onClick={() => setIsModalOpen(true)}
                    className='mt-2 flex items-center text-[12px] font-medium
                    text-gray-700 hover:text-primary bg-gray-50 hover:bg-blue-50
                    px-4 py-1.5 rounded-lg border border-gray-200/50 cursor-pointer'
                >
                    <LuUsers className='text-sm mr-3' />
                    Add Members 
                </button>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Select Users"
            >
                <div className=''>
                    
                </div>
            </Modal>
        </div>
    )
}

export default SelectUsers
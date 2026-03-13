import React, { useEffect, useState } from 'react'
import { get_all_users } from '../../api/userApi.js';
import { LuUsers } from 'react-icons/lu';
import Modal from '../Modal.jsx';
import AvatarGroup from '../AvatarGroup.jsx';

const SelectUsers = ({ selectedUsers, setSelectedUsers }) => {
    const [allUsers, setAllUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tempSelectedUsers, setTempSelectedUsers] = useState([]);

    const getAllUsers = async () => {
        try {
            const response = await get_all_users();
        
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

            {selectedUserAvatars.length > 0 && (
                <div onClick={() => setIsModalOpen(true)} className='cursor-pointer'>
                    <AvatarGroup avatars={selectedUserAvatars} maxVisible={3} />
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Select Users"
            >
                <div className='h-[35vh] space-y-4 overflow-y-auto overflow-x-hidden'>
                    {allUsers.map((user) => (
                        <div key={user._id} className='flex items-center gap-4 p-3 border-b border-gray-200 hover:bg-gray-50 transition'>
                            <img
                                src={user.profileImageUrl}
                                alt={user.name}
                                className='w-10 h-10 rounded-full'
                            />

                            <div className='flex-1'> {/*flex-1 means take the remaining space: it pushes checkbox towars the right */}
                                <p className='font-medium text-gray-800 dark:text-white'> {user.name} </p>
                                <p className='text-[13px] text-gray-500'> {user.email} </p>
                            </div>

                            <input
                                type='checkbox'
                                checked={tempSelectedUsers.includes(user._id)}
                                onChange={() => toggleUserSelection(user._id)}
                                className='w-4 h-4 outline-none cursor-pointer'
                            />
                        </div>
                    ))}
                </div>

                <div className='flex justify-end gap-4 pt-4'>
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className='mt-2 flex items-center text-[12px] font-medium
                        text-gray-700 hover:text-primary bg-gray-50 hover:bg-blue-50
                        px-4 py-1.5 rounded-lg border border-gray-200/50 cursor-pointer'
                    >
                        CANCEL
                    </button>

                    <button
                        onClick={handleAssign}
                        className='mt-2 flex items-center text-[12px] font-medium
                        text-white hover:text-primary bg-primary hover:bg-blue-50
                        px-4 py-1.5 rounded-lg hover:border-gray-200/50 cursor-pointer'
                    >
                        DONE
                    </button>
                </div>
            </Modal>
        </div>
    )
}

export default SelectUsers
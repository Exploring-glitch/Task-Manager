import { useEffect, useState } from "react";
import { LuUsers } from "react-icons/lu";
import toast from "react-hot-toast";
import Modal from "../Modal.jsx";
import AvatarGroup from "../AvatarGroup.jsx";
import { get_all_users } from "../../api/userApi.js";

const SelectUsers = ({ selectedUsers, setSelectedUsers }) => {
    const [allUsers, setAllUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tempSelectedUsers, setTempSelectedUsers] = useState(selectedUsers);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isActive = true;

        const loadUsers = async () => {
            try {
                const response = await get_all_users();
                if (isActive) setAllUsers(response || []);
            } catch (error) {
                if (isActive) toast.error(error.message || "Could not load members");
            } finally {
                if (isActive) setLoading(false);
            }
        };

        loadUsers();

        return () => {
            isActive = false;
        };
    }, []);

    const openModal = () => {
        // Always start from the committed selection so the modal reflects reality.
        setTempSelectedUsers(selectedUsers);
        setIsModalOpen(true);
    };

    const toggleUserSelection = (userId) => {
        setTempSelectedUsers((previous) =>
            previous.includes(userId)
                ? previous.filter((id) => id !== userId)
                : [...previous, userId]
        );
    };

    const handleAssign = () => {
        setSelectedUsers(tempSelectedUsers);
        setIsModalOpen(false);
    };

    const selectedUserAvatars = allUsers
        .filter((user) => selectedUsers.includes(user._id))
        .map((user) => user.profileImageUrl);

    return (
        <div>
            {selectedUserAvatars.length === 0 ? (
                <button
                    type="button"
                    onClick={openModal}
                    className="mt-2 flex cursor-pointer items-center rounded-lg border border-gray-200/50 bg-gray-50 px-4 py-1.5 text-[12px] font-medium text-gray-700 hover:bg-blue-50 hover:text-primary"
                >
                    <LuUsers className="mr-3 text-sm" aria-hidden="true" />
                    Add Members
                </button>
            ) : (
                <button type="button" onClick={openModal} className="mt-2 cursor-pointer">
                    <AvatarGroup avatars={selectedUserAvatars} maxVisible={3} />
                </button>
            )}

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Select Users">
                <div className="max-h-[35vh] space-y-4 overflow-y-auto overflow-x-hidden">
                    {loading && <p className="p-3 text-sm text-gray-500">Loading members...</p>}

                    {!loading && allUsers.length === 0 && (
                        <p className="p-3 text-sm text-gray-500">
                            No members yet. Invite your team to sign up first.
                        </p>
                    )}

                    {allUsers.map((user) => (
                        <label
                            key={user._id}
                            className="flex cursor-pointer items-center gap-4 border-b border-gray-200 p-3 transition hover:bg-gray-50"
                        >
                            <img
                                src={user.profileImageUrl || ""}
                                alt={`${user.name} avatar`}
                                className="h-10 w-10 rounded-full bg-slate-200 object-cover"
                            />

                            <div className="flex-1">
                                <p className="font-medium text-gray-800">{user.name}</p>
                                <p className="text-[13px] text-gray-500">{user.email}</p>
                            </div>

                            <input
                                type="checkbox"
                                checked={tempSelectedUsers.includes(user._id)}
                                onChange={() => toggleUserSelection(user._id)}
                                className="h-4 w-4 cursor-pointer outline-none"
                            />
                        </label>
                    ))}
                </div>

                <div className="flex justify-end gap-4 pt-4">
                    <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="mt-2 flex cursor-pointer items-center rounded-lg border border-gray-200/50 bg-gray-50 px-4 py-1.5 text-[12px] font-medium text-gray-700 hover:bg-blue-50 hover:text-primary"
                    >
                        CANCEL
                    </button>

                    <button
                        type="button"
                        onClick={handleAssign}
                        className="mt-2 flex cursor-pointer items-center rounded-lg bg-primary px-4 py-1.5 text-[12px] font-medium text-white hover:bg-blue-600"
                    >
                        DONE
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default SelectUsers;

import { useEffect, useState } from "react";
import { LuUsers } from "react-icons/lu";
import toast from "react-hot-toast";
import Modal from "../Modal.jsx";
import Avatar from "../ui/Avatar.jsx";
import AvatarGroup from "../AvatarGroup.jsx";
import Button from "../ui/Button.jsx";
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

    // Keep one slot per selected member. Members without a profile picture
    // used to disappear here, which made the trigger look unselected.
    const selectedUserAvatars = selectedUsers.map(
        (userId) => allUsers.find((user) => user._id === userId)?.profileImageUrl
    );
    const hasSelectedUsers = selectedUsers.length > 0;

    const closeModal = () => setIsModalOpen(false);

    return (
        <div>
            {!hasSelectedUsers ? (
                <button
                    type="button"
                    onClick={openModal}
                    className="flex w-full cursor-pointer items-center gap-2 rounded-xl border border-dashed border-line bg-slate-50/60 px-3.5 py-2.5 text-sm font-medium text-slate-500 transition hover:border-primary/40 hover:bg-primary-soft/40 hover:text-primary"
                >
                    <LuUsers className="text-base" aria-hidden="true" />
                    Add members
                </button>
            ) : (
                <button
                    type="button"
                    onClick={openModal}
                    className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-xl border border-line bg-slate-50/60 px-3 py-1.5 transition hover:border-slate-300 hover:bg-white"
                >
                    <AvatarGroup avatars={selectedUserAvatars} maxVisible={3} />

                    <span className="text-[11px] font-semibold text-slate-500">
                        {selectedUsers.length} selected
                    </span>
                </button>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title="Assign team members"
                description="Choose everyone who should own this task."
            >
                <div className="scrollbar-slim max-h-[45vh] space-y-1.5 overflow-y-auto pr-1">
                    {loading && <p className="p-3 text-sm text-slate-500">Loading members...</p>}

                    {!loading && allUsers.length === 0 && (
                        <p className="rounded-xl border border-dashed border-line bg-slate-50/60 p-4 text-center text-sm text-slate-500">
                            No members yet. Invite your team to sign up first.
                        </p>
                    )}

                    {allUsers.map((user) => {
                        const isSelected = tempSelectedUsers.includes(user._id);

                        return (
                            <label
                                key={user._id}
                                className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition ${
                                    isSelected
                                        ? "border-primary/30 bg-primary-soft/50"
                                        : "border-transparent hover:bg-slate-50"
                                }`}
                            >
                                <Avatar
                                    src={user.profileImageUrl}
                                    name={user.name}
                                    size="md"
                                    className="ring-2 ring-white"
                                />

                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-semibold text-slate-800">{user.name}</p>
                                    <p className="truncate text-xs text-slate-500">{user.email}</p>
                                </div>

                                <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => toggleUserSelection(user._id)}
                                    className="h-4 w-4 cursor-pointer rounded border-slate-300 outline-none"
                                />
                            </label>
                        );
                    })}
                </div>

                <div className="mt-5 flex justify-end gap-2 border-t border-line/70 pt-4">
                    <Button variant="secondary" onClick={closeModal}>
                        Cancel
                    </Button>

                    <Button onClick={handleAssign}>
                        {tempSelectedUsers.length > 0
                            ? `Assign (${tempSelectedUsers.length})`
                            : "Assign members"}
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default SelectUsers;

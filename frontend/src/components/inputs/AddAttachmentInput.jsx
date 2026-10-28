import { useRef, useState } from "react";
import { HiMiniPlus, HiOutlineTrash } from "react-icons/hi2";
import { LuPaperclip } from "react-icons/lu";

const AddAttachmentInput = ({ attachments = [], setAttachments }) => {
    const inputRef = useRef(null);
    const [option, setOption] = useState("");

    const handleAddOption = () => {
        const value = option.trim();

        if (!value) {
            inputRef.current?.focus();
            return;
        }

        setAttachments([...attachments, value]);
        setOption("");
    };

    const handleDeleteOption = (index) => {
        setAttachments(attachments.filter((_, itemIndex) => itemIndex !== index));
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleAddOption();
        }
    };

    return (
        <div>
            {attachments.map((item, index) => (
                <div
                    key={`${item}-${index}`}
                    className="mt-2 mb-3 flex justify-between rounded-md border border-gray-100 bg-gray-50 px-3 py-2"
                >
                    <div className="flex flex-1 items-center gap-3 border-gray-100">
                        <LuPaperclip className="text-gray-400" aria-hidden="true" />
                        <p className="truncate text-xs text-black">{item}</p>
                    </div>

                    <button
                        type="button"
                        aria-label={`Remove attachment ${index + 1}`}
                        onClick={() => handleDeleteOption(index)}
                        className="cursor-pointer"
                    >
                        <HiOutlineTrash className="text-lg text-red-500" />
                    </button>
                </div>
            ))}

            <div className="mt-4 flex items-center gap-5">
                <div className="flex flex-1 items-center gap-3 rounded-md border border-gray-100 px-3">
                    <LuPaperclip className="text-gray-400" aria-hidden="true" />

                    <input
                        ref={inputRef}
                        type="url"
                        placeholder="Add file link"
                        value={option}
                        maxLength={2048}
                        onChange={({ target }) => setOption(target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full bg-white py-2 text-[13px] text-black outline-none"
                    />
                </div>

                <button
                    type="button"
                    onClick={handleAddOption}
                    className="flex cursor-pointer items-center rounded-lg border border-gray-300/50 bg-gray-50 px-4 py-1.5 text-[12px] font-medium whitespace-nowrap text-gray-700 hover:bg-blue-50 hover:text-primary"
                >
                    <HiMiniPlus className="mr-2 text-[16px]" aria-hidden="true" />
                    <span className="text-[13px]">Add</span>
                </button>
            </div>
        </div>
    );
};

export default AddAttachmentInput;

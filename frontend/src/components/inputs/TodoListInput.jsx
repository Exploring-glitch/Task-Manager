import { useRef, useState } from "react";
import { HiMiniPlus, HiOutlineTrash } from "react-icons/hi2";

const TodoListInput = ({ todolist = [], setTodoList }) => {
    const inputRef = useRef(null);
    const [option, setOption] = useState("");

    const handleAddOption = () => {
        const value = option.trim();

        if (!value) {
            inputRef.current?.focus();
            return;
        }

        setTodoList([...todolist, value]);
        setOption("");
    };

    const handleDeleteOption = (index) => {
        setTodoList(todolist.filter((_, itemIndex) => itemIndex !== index));
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleAddOption();
        }
    };

    return (
        <div>
            {todolist.map((item, index) => (
                <div
                    key={`${item}-${index}`}
                    className="mb-3 flex justify-between rounded-md border border-gray-100 bg-gray-50 px-3 py-2"
                >
                    <p className="text-xs text-black">
                        <span className="mr-2 text-xs font-semibold text-gray-400">
                            {index < 9 ? `0${index + 1}` : index + 1}
                        </span>
                        {item}
                    </p>

                    <button
                        type="button"
                        aria-label={`Remove checklist item ${index + 1}`}
                        onClick={() => handleDeleteOption(index)}
                        className="cursor-pointer"
                    >
                        <HiOutlineTrash className="text-lg text-red-500" />
                    </button>
                </div>
            ))}

            <div className="mt-4 flex items-center gap-5">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Enter task"
                    value={option}
                    maxLength={200}
                    onChange={({ target }) => setOption(target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full border border-gray-100 bg-white px-3 py-1.5 text-[13px] text-black outline-none focus:ring-1 focus:ring-gray-200"
                />

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

export default TodoListInput;

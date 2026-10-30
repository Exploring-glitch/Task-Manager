import { useRef, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi2";
import { LuPlus } from "react-icons/lu";
import Button from "../ui/Button.jsx";

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
            {todolist.length === 0 ? (
                <p className="rounded-xl border border-dashed border-line bg-slate-50/50 px-4 py-6 text-center text-xs text-slate-500">
                    No steps yet. Add the first checklist item below.
                </p>
            ) : (
                <div className="space-y-2">
                    {todolist.map((item, index) => (
                        <div
                            key={`${item}-${index}`}
                            className="group flex items-center gap-3 rounded-xl border border-line bg-slate-50/60 px-3 py-2.5 transition hover:border-slate-300 hover:bg-white"
                        >
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-[10px] font-bold text-slate-500 ring-1 ring-line">
                                {index < 9 ? `0${index + 1}` : index + 1}
                            </span>

                            <p className="min-w-0 flex-1 truncate text-sm text-slate-700">{item}</p>

                            <button
                                type="button"
                                aria-label={`Remove checklist item ${index + 1}`}
                                onClick={() => handleDeleteOption(index)}
                                className="cursor-pointer rounded-lg p-1.5 text-slate-400 transition hover:bg-rose-50 hover:text-rose-500"
                            >
                                <HiOutlineTrash className="text-base" aria-hidden="true" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Add a checklist step..."
                    value={option}
                    maxLength={200}
                    onChange={({ target }) => setOption(target.value)}
                    onKeyDown={handleKeyDown}
                    className="field-input flex-1"
                />

                <Button variant="secondary" icon={LuPlus} onClick={handleAddOption}>
                    Add step
                </Button>
            </div>
        </div>
    );
};

export default TodoListInput;

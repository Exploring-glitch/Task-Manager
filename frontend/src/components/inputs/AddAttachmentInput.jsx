import { useRef, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi2";
import { LuPaperclip, LuPlus } from "react-icons/lu";
import Button from "../ui/Button.jsx";

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
            {attachments.length === 0 ? (
                <p className="rounded-xl border border-dashed border-line bg-slate-50/50 px-4 py-6 text-center text-xs text-slate-500">
                    No attachments yet. Add a link to a design, document or asset.
                </p>
            ) : (
                <div className="space-y-2">
                    {attachments.map((item, index) => (
                        <div
                            key={`${item}-${index}`}
                            className="group flex items-center gap-3 rounded-xl border border-line bg-slate-50/60 px-3 py-2.5 transition hover:border-slate-300 hover:bg-white"
                        >
                            <span className="icon-tile h-8 w-8 rounded-lg bg-white text-primary ring-1 ring-line">
                                <LuPaperclip className="text-sm" aria-hidden="true" />
                            </span>

                            <p className="min-w-0 flex-1 truncate text-xs font-medium text-slate-700">{item}</p>

                            <button
                                type="button"
                                aria-label={`Remove attachment ${index + 1}`}
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
                <div className="relative flex-1">
                    <LuPaperclip
                        className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-base text-slate-400"
                        aria-hidden="true"
                    />

                    <input
                        ref={inputRef}
                        type="url"
                        placeholder="Paste a file link..."
                        value={option}
                        maxLength={2048}
                        onChange={({ target }) => setOption(target.value)}
                        onKeyDown={handleKeyDown}
                        className="field-input pl-10"
                    />
                </div>

                <Button variant="secondary" icon={LuPlus} onClick={handleAddOption}>
                    Add link
                </Button>
            </div>
        </div>
    );
};

export default AddAttachmentInput;

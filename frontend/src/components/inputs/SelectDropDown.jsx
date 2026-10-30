import { useEffect, useRef, useState } from "react";
import { LuCheck, LuChevronDown } from "react-icons/lu";

const SelectDropDown = ({ options, value, onChange, placeholder = "Select an option" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return undefined;

        const handlePointerDown = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        const handleKeyDown = (event) => {
            if (event.key === "Escape") setIsOpen(false);
        };

        document.addEventListener("mousedown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("mousedown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    const handleSelect = (option) => {
        onChange(option);
        setIsOpen(false);
    };

    const selectedLabel = options.find((option) => option.value === value)?.label;

    return (
        <div ref={containerRef} className="relative w-full">
            <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                onClick={() => setIsOpen((open) => !open)}
                className={`flex w-full items-center justify-between gap-2 rounded-xl border bg-slate-50/60 px-3.5 py-2.5 text-sm shadow-sm outline-none transition ${
                    isOpen
                        ? "border-primary/60 bg-white ring-4 ring-primary/10"
                        : "border-line hover:border-slate-300"
                }`}
            >
                <span className={selectedLabel ? "text-slate-900" : "text-slate-400"}>
                    {selectedLabel || placeholder}
                </span>

                <LuChevronDown
                    className={`shrink-0 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                />
            </button>

            {isOpen && (
                <ul
                    role="listbox"
                    className="animate-fade-in scrollbar-slim absolute z-30 mt-1.5 max-h-60 w-full overflow-y-auto rounded-xl border border-line bg-white p-1 shadow-card"
                >
                    {options.map((option) => {
                        const isSelected = option.value === value;

                        return (
                            <li key={option.value}>
                                <button
                                    type="button"
                                    role="option"
                                    aria-selected={isSelected}
                                    onClick={() => handleSelect(option.value)}
                                    className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition ${
                                        isSelected
                                            ? "bg-primary-soft font-semibold text-primary"
                                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                    }`}
                                >
                                    {option.label}

                                    {isSelected && <LuCheck className="text-sm" aria-hidden="true" />}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default SelectDropDown;

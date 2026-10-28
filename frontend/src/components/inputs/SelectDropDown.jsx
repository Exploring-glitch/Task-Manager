import { useEffect, useRef, useState } from "react";
import { LuChevronDown } from "react-icons/lu";

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
                className="mt-2 flex w-full items-center justify-between rounded-md border border-slate-100 bg-white px-2.5 py-3 text-sm text-black outline-none"
            >
                {selectedLabel || <span className="text-gray-500">{placeholder}</span>}
                <LuChevronDown
                    className={`ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                />
            </button>

            {isOpen && (
                <ul
                    role="listbox"
                    className="absolute z-10 mt-1 w-full rounded-md border border-slate-100 bg-white shadow-lg"
                >
                    {options.map((option) => (
                        <li key={option.value}>
                            <button
                                type="button"
                                role="option"
                                aria-selected={option.value === value}
                                onClick={() => handleSelect(option.value)}
                                className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 ${
                                    option.value === value ? "font-medium text-primary" : ""
                                }`}
                            >
                                {option.label}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SelectDropDown;

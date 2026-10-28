import { useEffect, useRef } from "react";
import { HiOutlineX } from "react-icons/hi";

const SIZE_CLASSES = {
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
};

const Modal = ({ children, isOpen, onClose, title, size = "2xl", bodyClassName = "" }) => {
    const dialogRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return undefined;

        const handleKeyDown = (event) => {
            if (event.key === "Escape") onClose?.();
        };

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", handleKeyDown);

        dialogRef.current?.focus();

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget) onClose?.();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-950/50 p-4"
            onMouseDown={handleBackdropClick}
        >
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                tabIndex={-1}
                className={`relative w-full ${SIZE_CLASSES[size] || SIZE_CLASSES["2xl"]} outline-none`}
            >
                <div className="relative max-h-[85vh] overflow-y-auto rounded-lg bg-white shadow-lg">
                    <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 md:p-5">
                        <h3 id="modal-title" className="text-lg text-gray-900">
                            {title}
                        </h3>

                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close dialog"
                            className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
                        >
                            <HiOutlineX className="text-base" />
                        </button>
                    </div>

                    <div className={`space-y-4 p-4 md:p-5 ${bodyClassName}`}>{children}</div>
                </div>
            </div>
        </div>
    );
};

export default Modal;

import { useEffect, useRef } from "react";
import { HiOutlineX } from "react-icons/hi";

const SIZE_CLASSES = {
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
};

const Modal = ({ children, isOpen, onClose, title, description, size = "2xl", bodyClassName = "" }) => {
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
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-slate-950/60 p-4 backdrop-blur-sm"
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
                <div className="animate-fade-up relative max-h-[85vh] overflow-y-auto rounded-2xl border border-white/70 bg-white shadow-2xl shadow-slate-950/20">
                    <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-4">
                        <div>
                            <h3 id="modal-title" className="text-base font-semibold text-ink">
                                {title}
                            </h3>

                            {description && (
                                <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close dialog"
                            className="-mr-1 inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-transparent text-slate-400 transition hover:border-line hover:bg-slate-50 hover:text-slate-700"
                        >
                            <HiOutlineX className="text-lg" aria-hidden="true" />
                        </button>
                    </div>

                    <div className={`px-6 py-5 ${bodyClassName}`}>{children}</div>
                </div>
            </div>
        </div>
    );
};

export default Modal;

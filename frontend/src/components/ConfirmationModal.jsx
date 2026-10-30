import { LuTriangleAlert } from "react-icons/lu";
import Button from "./ui/Button.jsx";

const ConfirmationModal = ({ content, onConfirm, btnText, onCancel }) => {
    return (
        <div>
            <div className="flex items-start gap-3 rounded-xl border border-rose-100 bg-rose-50/70 p-4">
                <span className="icon-tile h-9 w-9 rounded-lg bg-white text-rose-500 ring-1 ring-rose-100">
                    <LuTriangleAlert className="text-lg" aria-hidden="true" />
                </span>

                <p className="pt-0.5 text-sm leading-6 text-slate-700">{content}</p>
            </div>

            <div className="mt-6 flex justify-end gap-2">
                {onCancel && (
                    <Button variant="secondary" onClick={onCancel}>
                        Cancel
                    </Button>
                )}

                <Button variant="danger" onClick={onConfirm}>
                    {btnText}
                </Button>
            </div>
        </div>
    );
};

export default ConfirmationModal;

import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { LuTrash, LuUpload } from "react-icons/lu";
import Avatar from "./ui/Avatar.jsx";

const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const ProfilePhotoSelector = ({ image, setImage }) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    // Release the object URL when it is no longer used.
    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    const handleImageChange = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!ALLOWED_TYPES.includes(file.type)) {
            toast.error("Only JPEG, PNG and WebP images are allowed");
            event.target.value = "";
            return;
        }

        if (file.size > MAX_FILE_SIZE_BYTES) {
            toast.error("The image must be 2 MB or smaller");
            event.target.value = "";
            return;
        }

        setImage(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);

        if (inputRef.current) inputRef.current.value = "";
    };

    const onChooseFile = () => {
        inputRef.current?.click();
    };

    return (
        <div className="mb-5 flex items-center gap-4 rounded-xl border border-line bg-slate-50/60 p-4">
            <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                ref={inputRef}
                onChange={handleImageChange}
                className="hidden"
            />

            <Avatar src={previewUrl} name="" size="xl" className="ring-4 ring-white" />

            <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-800">
                    Profile photo <span className="font-normal text-slate-400">(optional)</span>
                </p>
                <p className="mt-0.5 text-xs text-slate-500">JPEG, PNG or WebP. Maximum 2 MB.</p>

                <div className="mt-2.5 flex flex-wrap items-center gap-2">
                    <button type="button" className="btn btn-secondary btn-sm" onClick={onChooseFile}>
                        <LuUpload className="text-sm" aria-hidden="true" />
                        {image ? "Change photo" : "Choose photo"}
                    </button>

                    {image && (
                        <button
                            type="button"
                            className="btn btn-ghost btn-sm text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                            onClick={handleRemoveImage}
                        >
                            <LuTrash className="text-sm" aria-hidden="true" />
                            Remove
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePhotoSelector;

import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

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
        <div className="mb-3 flex justify-center sm:mb-6">
            <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                ref={inputRef}
                onChange={handleImageChange}
                className="hidden"
            />

            {!image ? (
                <div className="relative flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-blue-100">
                    <LuUser className="text-4xl" aria-hidden="true" />

                    <button
                        type="button"
                        aria-label="Choose a profile photo"
                        className="absolute bottom-11 left-14 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-blue-800 text-white"
                        onClick={onChooseFile}
                    >
                        <LuUpload />
                    </button>
                </div>
            ) : (
                <div className="relative">
                    <img
                        src={previewUrl}
                        alt="Profile preview"
                        className="h-20 w-20 rounded-full object-cover"
                    />

                    <button
                        type="button"
                        aria-label="Remove the selected photo"
                        className="absolute bottom-11 left-14 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-red-800 text-white"
                        onClick={handleRemoveImage}
                    >
                        <LuTrash />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfilePhotoSelector;

import React, { useRef, useState } from 'react'
import { LuUser, LuUpload, LuTrash } from "react-icons/lu"

const ProfilePhotoSelector = ({ image, setImage }) => {
    const inputRef = useRef();
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            //update the image this state
            setImage(file);

            //generate preview url from the file
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };

    return (
        <div className='flex justify-center mb-6'>
            <input
                type="file"
                accept='image/*'
                ref={inputRef}
                onChange={handleImageChange}
                className='hidden'
            />

            {!image ? (
                <div className='bg-blue-100 w-20 h-20 flex justify-center items-center rounded-full
                    relative cursor-pointer'
                >
                    <LuUser className='text-4xl'></LuUser>

                    <button
                        type='button'
                        className='bg-blue-800 text-white w-8 h-8 flex justify-center items-center rounded-full
                        absolute left-14 bottom-11 cursor-pointer'
                        onClick={onChooseFile}
                    >   <LuUpload />
                    </button>
                </div>
            ) : (
                <div className='relative'>
                    <img
                        src={previewUrl}
                        alt='profile photo'
                        className='w-20 h-20 rounded-full object-cover'
                    />
                    <button
                        type='button'
                        className='bg-red-800 text-white w-8 h-8 flex justify-center items-center rounded-full
                        absolute left-14 bottom-11 cursor-pointer'
                        onClick={handleRemoveImage}
                    >   <LuTrash />
                    </button>
                </div>
            )}
        </div>
    )
}

export default ProfilePhotoSelector
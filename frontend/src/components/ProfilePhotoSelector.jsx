import React, { useRef, useState } from 'react'
import { LuUser, LuUpload, LuTrash } from "react-icons/lu"

const ProfilePhotoSelector = ({ image, setImage }) => {
    const inputRef = useRef();
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file){
           //update the image this state
           setImage(file);

           //generate preview url from the file
           const preview = URL.createObjectURL(file);
           setPreviewUrl(preview);
        }
    };

    return (
        <div className=''>ProfilePhotoSelector</div>
    )
}

export default ProfilePhotoSelector
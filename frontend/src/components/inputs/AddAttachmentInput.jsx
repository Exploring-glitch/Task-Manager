import React, { useState } from 'react'
import { HiMiniPlus, HiOutlineTrash } from "react-icons/hi2";
import { LuPaperclip } from 'react-icons/lu';



const AddAttachmentInput = ({ attachments, setAttachments }) => {
    const [option, setOption] = useState("");

    //Function to handle adding an option
    const handleAddOption = () => {
        if (option.trim()) {
            setAttachments([...attachments, option.trim()]);
            setOption("");
        }
    }

    //Function to handle deleting an option
    const handleDeleteOption = (index) => {
        const updatedArr = attachments.filter((_, idx) => idx !== index);
        setAttachments(updatedArr);
    }


    return (
        <div>AddAttachmentInput</div>
    )
}

export default AddAttachmentInput;
import { upload_image } from "../api/userApi.js";

export const uploadImg = async (imageFile) => {
    const formData = new FormData();

    formData.append("image", imageFile);

    return upload_image(formData);
};

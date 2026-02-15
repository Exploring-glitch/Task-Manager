import { upload_image } from "../api/userApi.js"


export const uploadImg = async (imageFile) => {
    const formData = new FormData();

    //append imageFile to formData
    formData.append('image', imageFile);

    try{
        const response = await upload_image(formData, {
            
        }) 
    }
    catch{

    }
}
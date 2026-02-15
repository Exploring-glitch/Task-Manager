import { upload_image } from "../api/userApi.js"


export const uploadImg = async (imageFile) => {
    const formData = new FormData();

    //append imageFile to formData
    formData.append('image', imageFile);

    try{
        const response = await upload_image(formData, {
            headers: {
                'Content-type' : 'multipart/form-data', //set jheader for file upload
            },
        }); 
        return response.data
    }
    catch(e){
        console.log('Error uploading the image. Error: ', e);
        throw e;
    }
}
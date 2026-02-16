import { upload_image } from "../api/userApi.js"


export const uploadImg = async (imageFile) => {
    const formData = new FormData();
    console.log("from uploadImg",imageFile)
    //append the imageFile to formData
    formData.append("image", imageFile);
    console.log("formData", formData)
    try {
        console.log("hii from uploadImg")
        const response = await upload_image(formData);
        console.log(response)
        return response;
    }
    catch (e) {
        console.log('Error uploading the image. Error: ', e);
        throw e;
    }
}
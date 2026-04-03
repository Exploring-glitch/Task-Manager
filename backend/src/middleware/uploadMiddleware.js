import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinaryConfig.js";


//configure storage
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "profile_images", // folder in cloudinary
        allowed_formats: ["jpg", "png", "jpeg"],
    },
});


//file filter()
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'] //these are the mimetype of the file
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error('Only .jpeg, .png and .jpg formats are allowed'), false);
    }

}


export const uploadMiddleware = multer({ storage, fileFilter })

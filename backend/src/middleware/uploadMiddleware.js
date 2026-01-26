import multer from "multer";

//configure storage
const storage = multer.diskStorage({
    destination : (req, file, cb) =>{ //cb is callback func
        cb(null, 'uploads/');
    },
    filename : (req, file, cb) =>{
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})


//file filter()
const fileFilter = (req, file, cb) =>{
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'] //these are the mimetype of the file
    if(allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else{
        cb(new Error('Only .jpeg, .png and .jpg formats are allowed'), false);
    }
    
}


export const uploadMiddleware = multer({storage, fileFilter})

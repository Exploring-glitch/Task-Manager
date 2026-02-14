import { cookieOptions } from "../config/config.js";
import { createNewUser, findUserByEmail, findUserByEmailAndPassword, findUserByIdAndPassword } from "../dao/userDao.js";
import { signToken } from "../utils/helper.js"


export const userSignup = async (req, res) => {
    try {
        const { name, email, password, profileImageUrl, adminInviteToken } = req.body;

        //check if user already exists 
        const userExist = await findUserByEmail(email);
        if (userExist) {
            return res.status(409).json({ message: "User already exists" });
        }

        //check if the user is admin: if he/she has adminInviteToken
        let role = "member"
        if (adminInviteToken && adminInviteToken == process.env.ADMIN_INVITE_TOKEN) {
            role = "admin"
        }

        //hashing password: its already done in user schema before saving the schema
        
        //create new user
        const newUser = await createNewUser(name, email, password, profileImageUrl, role);
        const token = signToken({ id: newUser._id })

        res.cookie("token", token, cookieOptions)
        res.status(200).json({ "message": "Sign up success", "user": newUser, "token": token })
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await findUserByEmailAndPassword(email)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        
        const isPassValid = await user.comparePassword(password) //using the comparePassword method from the userSchema directly here
        if (!isPassValid) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        const token = signToken({ id: user._id });
        
        res.cookie("token", token, cookieOptions);
        res.status(200).json({ "message": "Login success", "user": user, "token": token });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const user = await findUserByIdAndPassword(req.user.id)
        if (!user) {
            return res.status(404).json({ "message": "User not found" })
        }

        res.status(200).json(user)
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateUserProfile = async (req, res) => {
    try {
        const user = await findUserByIdAndPassword(req.user.id)
        if (!user) {
            return res.status(404).json({ "message": "User not found" })
        }
        
        //updating logic
        if (req.body.name) {  //if user passes a new name, then update prev stored name with the new name passed
            user.name = req.body.name;
        }
        if (req.body.email) { //if user passes a new email, then update prev stored email with the new email passed
            user.email = req.body.email;
        }
        if (req.body.password){
            user.password = req.body.password;
        }

        await user.save();

        res.status(200).json({ message: "Profile updated successfully", user: user });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const uploadProfileImage = (req,res) =>{
    try{
        if(!req.file){
            return res.status(400).json({ "message":"No file uploaded" });
        }

        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
        res.status(200).json({ imageUrl })
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}
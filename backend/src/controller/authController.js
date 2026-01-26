import { createNewUser, findUserByEmail, findUserByEmailAndPassword } from "../dao/userDao.js";
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

        res.status(200).json({ "message": "Sign up success", "user": newUser, "token": token })
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const userLogin = async (req, res) => {
    try{
        const {email, password} = req.body;
      
        const user = await findUserByEmailAndPassword(email) 
        if(!user){
            return res.status(401).json({message: "User not found"})
        } 
        
        const isPassValid = await user.comparePassword(password) //using the comparePassword method from the userSchema directly here
        if(!isPassValid){
            return res.status(401).json({message: "Invalid credentials"})
        }

        const token = signToken({ id: user._id })
        res.status(200).json({"message" : "Login success", "user" : user, "token" : token})
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const userLogout = async (req, res) => {

}

export const getUserProfile = async (req, res) => {

}

export const updateUserProfile = async (req, res) => {

}


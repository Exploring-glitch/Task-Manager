import { createNewUser, findUserByEmail } from "../dao/userDao.js";
import { hashPassword, signToken } from "../utils/helper.js"


export const userSignup = async (req, res) => {
    try {
        const { name, email, password, profileImageUrl, adminInviteToken } = req.body;

        //check if user already exists 
        const userExist = await findUserByEmail(email);
        if (userExist) {
            return res.status(404).json({ message: "User already exists" });
        }

        //check if the user is admin: if he/she has adminInviteToken
        let role = "member"
        if (adminInviteToken && adminInviteToken == process.env.ADMIN_INVITE_TOKEN) {
            role = "admin"
        }

        //hash password
        const hashedPassword = await hashPassword(password);


        //create new user
        const newUser = await createNewUser(name, email, hashedPassword, profileImageUrl, role);
        const token = signToken({ id: newUser._id })

        res.status(200).json({ message: "Sign up success", token: token })
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const userLogin = async (req, res) => {

}

export const userLogout = async (req, res) => {

}

export const getUserProfile = async (req, res) => {

}

export const updateUserProfile = async (req, res) => {

}


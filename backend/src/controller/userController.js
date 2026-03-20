import { memberInfo } from "../dao/taskDao.js";
import { findUserById, getAllMembers } from "../dao/userDao.js";


export const getAllUsers = async (req, res) => {
    try {
        const users = await getAllMembers();
        if (!users) {
            return res.status(404).json({ "message": "User not found" })
        }

        //return user info along with the current task count and status of each user
        const userWithTaskCount = await memberInfo(users);

        res.status(200).json( userWithTaskCount )
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await findUserById(req.params.id)
        if (!user) {
            return res.status(404).json({ "message": "User not found" })
        }
        res.status(200).json(user)
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}
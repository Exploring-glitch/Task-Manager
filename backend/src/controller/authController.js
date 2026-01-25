import { signToken } from "../utils/helper.js"


export const userSignup = async(req, res) => {
    const newUser = createNewUser(); //....
    const token = signToken({id: newUser._id})
}

export const userLogin = async(req, res) => {
    
}

export const userLogout = async(req, res) => {
    
}

export const getUserProfile = async(req, res) => {
    
}

export const updateUserProfile = async(req, res) => {
    
}


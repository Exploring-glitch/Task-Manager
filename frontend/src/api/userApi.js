import { axiosInstance } from "../util/axiosInstance.js";



export const login_User = async (email, password) => {
    const {data} = await axiosInstance.post("api/auth/login", {email, password})
    return data;
}

export const signup_User = async (name, email, password, profileImageUrl, adminInviteToken) => {
    const {data} = await axiosInstance.post("api/auth/signup", {name, email, password, profileImageUrl, adminInviteToken})
    return data;
}
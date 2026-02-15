import { axiosInstance } from "../util/axiosInstance.js";


export const login_User = async (email, password) => {
    const {data} = await axiosInstance.post("api/auth/login", {email, password})
    return data;
}

export const signup_User = async (fullName, email, password, profileImageUrl, adminInviteToken) => {
    const {data} = await axiosInstance.post("api/auth/signup", {name:fullName, email, password, profileImageUrl, adminInviteToken})
    return data;
}
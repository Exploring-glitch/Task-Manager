import { axiosInstance } from "../util/axiosInstance.js";

export const login_User = async (email, password) => {
    const {data} = await axiosInstance.post("api/auth/login", {email, password})
    return data;
}
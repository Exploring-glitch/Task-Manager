import { axiosInstance } from "../util/axiosInstance.js";


export const login_user = async (email, password) => {
    const { data } = await axiosInstance.post("api/auth/login", { email, password })
    return data;
}

export const signup_user = async (fullName, email, password, profileImageUrl, adminInviteToken) => {
    const { data } = await axiosInstance.post("api/auth/signup", { name: fullName, email, password, profileImageUrl, adminInviteToken })
    return data;
}

export const upload_image = async (formData) => {
    const { data } = await axiosInstance.post("api/auth/upload-image", formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true // keep cookies
        }
    )
    return data;
}

export const logout_user = async () => {
    const { data } = await axiosInstance.post("api/auth/logout", {}, { withCredentials: true })
    return data;
}

export const get_all_users = async () => {
    const { data } = await axiosInstance.get("api/users/");
    return data;
}
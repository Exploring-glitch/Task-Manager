import { axiosInstance } from "../util/axiosInstance.js";


export const dashboard_data = async() => {
    const { data } = await axiosInstance.get("api/tasks/dashboard"); 
    return data;
}
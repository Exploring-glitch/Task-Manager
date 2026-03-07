import { axiosInstance } from "../util/axiosInstance.js";


export const dashboard_data = async() => {
    const { data } = await axiosInstance.get("api/tasks/dashboard"); 
    return data;
}

export const create_task = async() => {
    console.log("api")
    const { data } = await axiosInstance.post("/api/tasks/create-task", taskData);
    console.log("from api call data: ", data)
    return data;
}
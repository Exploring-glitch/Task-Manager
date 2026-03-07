import { axiosInstance } from "../util/axiosInstance.js";


export const dashboard_data = async() => {
    const { data } = await axiosInstance.get("api/tasks/dashboard"); 
    return data;
}

export const create_task = async(taskData) => {
    const { data } = await axiosInstance.post("/api/tasks/create-task", taskData);
    return data;
}

export const get_all_tasks = async(taskData) => {
    const { data } = axiosInstance.get("/api/tasks/", taskData);
    return data;
}
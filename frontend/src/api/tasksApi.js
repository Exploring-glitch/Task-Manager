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
    const { data } = await axiosInstance.get("/api/tasks/", taskData);
    return data;
}

export const get_task_details_by_id = async(taskId) => {
    const { data } = await axiosInstance.get(`/api/tasks/${taskId}`)
    return data;    
}

export const update_task = async(taskId, taskData) => {
    const { data } = await axiosInstance.put(`/api/tasks/update-task/${taskId}`, taskData);
    return data;
}

export const delete_task = async(taskId) => {
    const { data } = await axiosInstance.delete(`/api/tasks/delete-task/${taskId}`);
    return data;
}
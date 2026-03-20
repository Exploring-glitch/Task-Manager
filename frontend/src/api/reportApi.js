import { axiosInstance } from "../util/axiosInstance.js"


export const download_user_report = async() => {
    const { data } = await axiosInstance.get("/api/reports/export/users", {responseType: "blob"})
    return data
}

export const download_task_report = async() => {
    const { data } = await axiosInstance.get("/api/reports/export/tasks", {responseType: "blob"})
    return data;
}
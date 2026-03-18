import { axiosInstance } from "../util/axiosInstance.js"


export const download_report = async(responseType) => {
    const { data } = axiosInstance.get("/api/reports/export/users", responseType)
}
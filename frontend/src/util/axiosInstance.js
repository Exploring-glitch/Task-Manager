import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const data = error.response?.data;

        if (import.meta.env.DEV) {
            console.error(`[api] ${status || "network error"}`, data || error.message);
        }

        const message =
            data?.message ||
            error.message ||
            "Something went wrong. Please try again.";

        const normalizedError = new Error(message);
        normalizedError.status = status;
        normalizedError.data = data;

        return Promise.reject(normalizedError);
    }
);

export { axiosInstance };

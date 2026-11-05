import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    (response) => {
        const contentType = response.headers?.["content-type"] || "";

        // A misconfigured API base URL usually points at the static frontend,
        // which answers with index.html. Fail loudly instead of letting pages
        // render empty data as if the request had succeeded.
        if (contentType.includes("text/html")) {
            const configurationError = new Error(
                "The API returned a web page instead of data. Check that VITE_API_URL points to the backend."
            );
            configurationError.status = response.status;
            return Promise.reject(configurationError);
        }

        return response;
    },
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

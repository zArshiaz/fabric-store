import axios from "axios";
import https from "https";

const DEFAULT_API_BASE_URL = "http://localhost:4000/api";

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
});

// SSR (Docker): API_BASE_URL → http://backend:3000/api
// CSR / local: NEXT_PUBLIC_API_BASE_URL → http://localhost:4000/api
function getApiBaseUrl(): string {
    if (typeof window === "undefined") {
        return process.env.API_BASE_URL
            || process.env.NEXT_PUBLIC_API_BASE_URL
            || DEFAULT_API_BASE_URL;
    }

    return process.env.NEXT_PUBLIC_API_BASE_URL || DEFAULT_API_BASE_URL;
}

const http = axios.create({
    baseURL: getApiBaseUrl(),
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
    httpsAgent: httpsAgent,
});

http.interceptors.request.use((config) => {
    config.baseURL = getApiBaseUrl();
    return config;
});

http.interceptors.response.use(
    (res) => {
        console.log(res);
        return res;
    },
    (error) => {
        console.log("error:", error);
        return Promise.reject(error);
    }
);

export default http;

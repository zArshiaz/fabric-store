import axios from "axios";
import https from "https";

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
});

const http = axios.create({
    baseURL: "http://localhost:4000/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
    httpsAgent: httpsAgent, // 👈 این خط مهم است
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

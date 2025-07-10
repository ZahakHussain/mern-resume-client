import axios from "axios";

const api = axios.create({
    baseURL: "https://mern-resume-server.onrender.com",
    withCredentials: true,
});

api.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token){
        req.headers.Authorization = `Bearer ${token}`; //attach token here
    }
    return req;
});

export default api;

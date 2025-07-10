import axios from "axios";

const api = axios.create({
    baseURL: "https://mern-resume-server.onrender.com",
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token){
        config.headers.Authorization = token; //send token in header
    }
    return config;
}, (error) => Promise.reject(error)   
);

export default api;

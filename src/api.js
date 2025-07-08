import axios from "axios";

const api = axios.create({
    baseURL: "https://mern-resume-server.onrender.com",
    withCredentials: true,
});

export default api;

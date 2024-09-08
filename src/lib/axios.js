import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_API_URL
});

api.interceptors.request.use(config => {
    const bearerToken = localStorage.getItem('AUTH_TOKEN');

    if (bearerToken) {
        config.headers.Authorization = `Bearer ${bearerToken}`
    }
    return config;

});

export default api;
import axios from "axios";
import { environment } from "../enviroments/enviroment";

const api = axios.create({
    baseURL: environment.url
});

api.interceptors.request.use(config => {
    const bearerToken = localStorage.getItem('AUTH_TOKEN');

    if (bearerToken) {
        config.headers.Authorization = `Bearer ${bearerToken}`
    }
    return config;

});

export default api;
import { isAxiosError } from "axios";
import api from "../lib/axios";


export async function listUsers(){
    try {
        const url = 'users/list-all';
        const {data} = await api.get(url);

        return data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
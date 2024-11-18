import { isAxiosError } from "axios";
import api from "../lib/axios";


export async function listUsers(url) {
    try {
        const { data } = await api.get(url);

        return data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function findUser(idUser) {
    try {
        const url = `users/find/${idUser}`
        const { data } = await api.get(url);

        return data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function updateUsers(user) {
    try {
        const url = "users/update";
        const { data } = await api.put(url, user);



        return data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function deleteUser(user) {

    try {
        const url = `users/delete/${user}`;
        const { data } = await api.delete(url);



        return data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
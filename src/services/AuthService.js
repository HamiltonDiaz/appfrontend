import api from "../lib/axios";
import { isAxiosError } from 'axios'

export async function createUser(user) {

    try {

        const url = 'users/register'
        const { data } = await api.post(url, user);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }

    }


}


export async function loginUsuario(user) {
    try {

        const url = 'users/login'
        const { data } = await api.post(url, user);
        localStorage.setItem('AUTH_TOKEN', data.access_token);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }

}

export async function getUser() {
    try {
        const url = 'users/me'
        const { data } = await api.get(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }

}

export async function logout() {
    try {
        const url = 'users/logout'
        const { data } = await api.post(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function forgot(email) {
    try {
        const url = 'users/password/forgot'
        const { data } = await api.post(url, email);
        localStorage.setItem('TOKEN_RESET',data.data.token);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }

}

export async function resetPassword(resetPassword) {
    try {
        resetPassword.token = localStorage.getItem('TOKEN_RESET');
        const url = 'users/password/reset'
        const { data } = await api.post(url, resetPassword);
        if (data.success) localStorage.removeItem('TOKEN_RESET');
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}
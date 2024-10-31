import api from "../lib/axios";
import { isAxiosError } from 'axios'


export async function listProyect() {
    try {
        const { data } = await api.get("project/list-all");
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function createProyect(proyecto) {
    try {
        const { data } = await api.post("project/create", proyecto);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function deleteProyect(proyect) {
    try {
        const url = `project/delete/${proyect}`;
        const { data } = await api.delete(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
export async function downloadProyect(file) {
    try {
        const url = `project/download/${file}`;
        const { data } = await api.get(url,{ responseType: 'blob' });
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error("Error al descargar el archivo");
    }
}
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
export async function listProyectById(idProyect) {
    try {
        const { data } = await api.get(`project/find/${idProyect}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function createProyect(proyecto) {
    try {
        console.log(proyecto);

        const { data } = await api.post("project/create", proyecto);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function editProyect(proyecto) {
    try {
        console.log(proyecto);
        const { data } = await api.post("project/update", proyecto);
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
        const { data } = await api.get(url, { responseType: 'blob' });
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error("Error al descargar el archivo");
    }
}
export async function agregarUsuario(usuario) {
    try {
        const url = `project/assign-member`;
        const { data } = await api.post(url, usuario);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error("Error al asignar el usuario al proyecto");
    }
}
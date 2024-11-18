import React from 'react'
import { useForm } from "react-hook-form"
import { listUsers } from '../services/UserService';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMutation } from "@tanstack/react-query"
import { agregarUsuario } from '../services/ProyectService';
import { toast, ToastContainer } from 'react-toastify';

const AgregarIntegrante = ({ id_proyecto }) => {
    const url = 'users/list-all'
    const { handleSubmit, register } = useForm();
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({
        queryKey: ['users', url],
        queryFn: () => listUsers(url)
    });

    const agregarUsuarioProyecto = useMutation(
        {
            mutationFn: agregarUsuario,
            onError: (err) => {
                toast.error(err);
            },
            onSuccess: (data) => {
                toast.success("Usuario agregado correctamente");
                queryClient.invalidateQueries("proyectID");
            }
        }
    )

    if (isLoading) return <p>Cargando..</p>
    const usuario = data.data;

    const onSubmit = (data) => {
        data.id_proyecto = id_proyecto
        agregarUsuarioProyecto.mutate(data)
    }
    return (
        <>
            <ToastContainer />
            <div className="input-container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <select name="id_usuario" id="id_usuario" {...register("id_usuario")} className='custom-input'>
                        {usuario.map((usuario, index) => <option key={index} value={usuario.id}>{usuario.primer_nombre} {usuario.primer_apellido}</option>)}
                    </select>
                    <button className="custom-button">
                        Agregar Integrante
                    </button>
                </form>
            </div>
        </>
    )
}

export default AgregarIntegrante
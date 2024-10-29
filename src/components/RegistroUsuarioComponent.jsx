import React, { useState } from 'react'
import Modal from './ModalEditarUsuario';
import { deleteUser } from '../services/UserService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const RegistroUsuarioComponent = ({ user }) => {
    const { numero_identificacion,
        name,
        otros_nombres,
        primer_apellido,
        primer_nombre,
        segundo_apellido,
        telefono,
        email, id } = { ...user }

    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const queryClient = useQueryClient();

    const { mutate } = useMutation(
        {

            mutationFn: deleteUser,
            onSuccess: () => {
                // Invalida y refetch la lista de usuarios
                queryClient.invalidateQueries('users');
            },
        });



    // Función para manejar la eliminación del usuario
    const handleDelete = () => {
        if (window.confirm(`Estas seguro que quieres eliminar al usuario ${numero_identificacion}?`)) {
            mutate(id);
        }
    };


    return (
        <>
            <tr>
                <td>{numero_identificacion}</td>
                <td>{primer_nombre}</td>
                <td>{otros_nombres}</td>
                <td>{primer_apellido}</td>
                <td>{segundo_apellido}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{telefono}</td>
                <td>
                    <button className="action-btn edit-btn" onClick={toggleModal} >
                        <i className="bi bi-pencil-square"></i>
                    </button>
                    <button className="action-btn delete-btn"><i className="bi bi-trash" onClick={handleDelete}></i></button>
                </td>
            </tr>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} user={user}></Modal>
        </>
    )
}

export default RegistroUsuarioComponent
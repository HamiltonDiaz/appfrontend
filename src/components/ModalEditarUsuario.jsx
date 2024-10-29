import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { listUsers, updateUsers } from '../services/UserService';
import { toast } from 'react-toastify';

function Modal({ isOpen, setIsOpen, user }) {
    const { register, reset, handleSubmit } = useForm();

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const url = 'users/list-all'

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['users', url],
        queryFn: () => listUsers(url)
    });

    const { mutate } = useMutation({
        mutationFn: updateUsers,
        onError: (err) => {

            toast(err.message);

        },
        onSuccess: (data) => {

            if (!data.success) {
                toast.error(data.message);

            } else {
                toast.success(data.message);
                setIsOpen(!isOpen);
                reset();           // Limpiar el formulario
                refetch();         // Recargar los datos actualizados
            }
        }
    });

    const onSubmit = (data) => mutate(data);

    useEffect(() => {
        reset(user); // Resetear el formulario cuando cambie el usuario
    }, [user, reset]);

    return (
        <div>

            {/* Fondo oscuro */}
            {isOpen && (
                <div
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', }}
                    className='modal-overlay'
                >
                    {/* Contenido del modal */}
                    <div className="modal-content">
                        <p onClick={toggleModal}>X</p>
                        <h2 className="modal-title">Formulario de Registro</h2>

                        {/* Formulario */}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="numero_identificacion"
                                    id="numero_identificacion"
                                    placeholder="Número de identificación"
                                    defaultValue={user.numero_identificacion}
                                    {...register('numero_identificacion')}
                                />
                            </div>
                            <div className="form-group">
                                <select id="id_tipos_identificacion" required {...register('id_tipos_identificacion')}>
                                    <option value="1">Cédula de Ciudadanía</option>
                                    <option value="2">Tarjeta de Identidad</option>
                                    <option value="3">Cédula de Extranjería</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="primer_nombre"
                                    id='primer_nombre'
                                    placeholder="Primer Nombre"
                                    defaultValue={user.primer_nombre}
                                    {...register('primer_nombre')}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="otros_nombre"
                                    id="otros_nombre"
                                    placeholder="Otros Nombres"
                                    defaultValue={user.otros_nombres}
                                    {...register('otros_nombres')}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="primer_apellido"
                                    id="primer_apellido"
                                    placeholder="Primer Apellido"
                                    defaultValue={user.primer_apellido}
                                    {...register('primer_apellido')}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="segundo_apellido"
                                    id="segundo_apellido"
                                    placeholder="Segundo Apellido"
                                    defaultValue={user.segundo_apellido}
                                    {...register('segundo_apellido')}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Nombre de Usuario"
                                    defaultValue={user.name}
                                    {...register('name')}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Correo electrónico"
                                    defaultValue={user.email}
                                    {...register('email')}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="tel"
                                    name="telefono"
                                    id="telefono"
                                    placeholder="Teléfono móvil"
                                    defaultValue={user.telefono}
                                    {...register('telefono')}
                                />
                            </div>
                            <input type="hidden" defaultValue={user.id} name='id' id='id' {...register('id')} />
                            <div className="modal-actions">
                                <button
                                    type="submit"
                                    className="modal-button-submit"
                                >
                                    Aceptar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Modal;
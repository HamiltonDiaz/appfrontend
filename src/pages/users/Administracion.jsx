import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from "react-hook-form";

// Importar componentes
import RegistroUsuarioComponent from '../../components/RegistroUsuarioComponent';
import { listUsers } from '../../services/UserService';
import { createUser } from '../../services/AuthService';
import BuscarUsuario from '../../components/BuscarUsuario';

const Administracion = () => {

    const url = 'users/list-all'
    const { handleSubmit, register, reset } = useForm();
    const queryClient = useQueryClient();

    const [users, setUsers] = useState([])
    const [links, setLink] = useState([{ url: null, label: '' }])

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['users', url],
        queryFn: () => listUsers(url)
    });

    const { mutate } = useMutation({
        mutationFn: createUser,
        onError: (err) => {
            toast(err.message);

        },
        onSuccess: (data) => {
            if (!data.success) {
                toast.error(data.message);
            } else {
                toast.success(data.message);
                queryClient.invalidateQueries("users");
                reset();
            }
        }
    });

    useEffect(() => {
        if (!(data == undefined)) {
            setUsers(data.data)
            setLink(data.links)
        }
    }, [data])
    if (isLoading) return 'Cargando...'
    const userNext = async (data) => {
        const url = (data.split('v1')[1]);
        try {
            const userslist = await listUsers(url);
            setUsers(userslist.data);
            setLink(userslist.links);

        } catch (error) {

        }
    }


    const onSubmit = (data) => mutate(data)

    return (
        <div className="div">
            <main className="content">
                <ToastContainer />
                <h3>Usuarios</h3>
                <section className="project-form">
                    <div className="accordion accordion-flush" id="accordionFlushExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseOne"
                                    aria-expanded="false"
                                    aria-controls="flush-collapseOne"
                                >
                                    Crear Usuarios
                                </button>
                            </h2>
                            <div
                                id="flush-collapseOne"
                                className="accordion-collapse collapse"
                                data-bs-parent="#accordionFlushExample"
                            >
                                <div className="accordion-body">
                                    <div className="">
                                        <form
                                            onSubmit={handleSubmit(onSubmit)}
                                        >
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="form-floating mb-3">
                                                        <select id="id_tipos_identificacion" required className="form-control" {...register('id_tipos_identificacion')}>
                                                            <option value="1">Cédula de Ciudadanía</option>
                                                            <option value="2">Tarjeta de Identidad</option>
                                                            <option value="3">Cédula de Extranjería</option>
                                                        </select>
                                                        <label htmlFor="floatingInput">Tipo de Identificación</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-floating mb-3">
                                                        <input
                                                            type="text"
                                                            className='form-control'
                                                            id="numero_identificacion"
                                                            placeholder="Número de identificación"
                                                            {...register('numero_identificacion')} />
                                                        <label htmlFor="floatingInput">Numero identificación</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-floating mb-3">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="primer_nombre"
                                                            placeholder="Primer Nombre" required
                                                            {...register('primer_nombre')} />
                                                        <label htmlFor="floatingInput">Primer Nombre</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-floating mb-3">
                                                        <input
                                                            type="text"
                                                            id="otros_nombres"
                                                            className="form-control"
                                                            placeholder="Otros Nombres"
                                                            {...register('otros_nombres')} />
                                                        <label htmlFor="floatingInput">Otros Nombre</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-floating mb-3">
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            placeholder="Primer Apellido"
                                                            id="primer_apellido"
                                                            {...register('primer_apellido')} />
                                                        <label htmlFor="floatingInput">Primer Apellido</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-floating mb-3">
                                                        <input
                                                            type="text"
                                                            className='form-control'
                                                            id="segundo_apellido"
                                                            placeholder="Segundo Apellido" required
                                                            {...register('segundo_apellido')} />
                                                        <label htmlFor="floatingInput">Segundo Apellido</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-floating mb-3">
                                                        <input
                                                            type="text"
                                                            id="name"
                                                            className='form-control'
                                                            placeholder="Nombre de Usuario"
                                                            {...register('name')} />
                                                        <label htmlFor="floatingInput">Nombre de Usuario</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-floating mb-3">
                                                        <input
                                                            // type="email"
                                                            id="email"
                                                            className='form-control'
                                                            placeholder="Correo electrónico" required
                                                            {...register('email')} />
                                                        <label htmlFor="floatingInput">Correo Electronico</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-floating mb-3">
                                                        <input
                                                            type="tel"
                                                            id="telefono"
                                                            placeholder="Teléfono móvil" required
                                                            className='form-control'
                                                            {...register('telefono')} />
                                                        <label htmlFor="floatingInput">Telefono</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-floating mb-3">
                                                        <input
                                                            type="password"
                                                            id="password"
                                                            placeholder="Contraseña" required
                                                            className='form-control'
                                                            {...register('password')} />
                                                        <label htmlFor="floatingInput">Contraseña</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-floating mb-3">
                                                        <input
                                                            type="password"
                                                            id="password_confirmation"
                                                            placeholder="Contraseña" required
                                                            className='form-control'
                                                            {...register('password_confirmation')} />
                                                        <label htmlFor="floatingInput">Confirmar Contraseña</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-12 d-flex justify-content-end">
                                                    <button className="btn btn-primary">Guardar</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div
                                        className="btn-group mt-3"
                                        role="group"
                                        aria-label="Basic example"
                                        style={{ flexWrap: "wrap" }}
                                    >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <BuscarUsuario setState={setUsers} buscar="Usuario" />
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Número de Identificación</th>
                                <th>Primer Nombre</th>
                                <th>Otro Nombre</th>
                                <th>Primer Apellido</th>
                                <th>Segundo Apellido</th>
                                <th>Nombre de Usuario</th>
                                <th>Email</th>
                                <th>Teléfono</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="userTableBody">
                            {users.map(user => <RegistroUsuarioComponent key={user.id} user={user} />)}

                        </tbody>
                    </table>
                </div>
                <div className="pagination">
                </div>
            </main>

        </div>
    )
}

export default Administracion
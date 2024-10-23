import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { logout } from '../services/AuthService';
import { toast, ToastContainer } from 'react-toastify'
import { useQuery, useMutation } from '@tanstack/react-query'
// Importar componentes
import FormularioUsuarioComponent from '../components/FormularioUsuarioComponent';
import RegistroUsuarioComponent from '../components/RegistroUsuarioComponent';
import ComentariosComponent from '../components/ComentariosComponent';
import { listUsers } from '../services/UserService';

const Administracion = () => {
    const navigate = useNavigate();
    const url = 'users/list-all'

    const [users, setUsers] = useState([])
    const [links, setLink] = useState([{ url: null, label: '' }])

    const closeSeccin = async () => {
        const data = await logout();
        toast.success(data.message);
        localStorage.removeItem('AUTH_TOKEN');
        navigate('/login');

    }

    const { data, isLoading } = useQuery({
        queryKey: ['users', url],
        queryFn: () => listUsers(url)
    });

    useEffect(() => {
        if (!(data == undefined)) {
            setUsers(data.data)
            setLink(data.links)
        }
    }, [data])



    if (isLoading) return 'Cargando...'

    console.log(links);

    // setUsers(data.data)

    const userNext = async (data) => {


        const url = (data.split('v1')[1]);

        try {
            const userslist = await listUsers(url);
            setUsers(userslist.data);
            setLink(userslist.links);

        } catch (error) {

        }
    }


    return (
        <>
            {/* Formulario de Búsqueda y Registro  */}
            <FormularioUsuarioComponent />

            {/* Tabla de Usuarios  */}
            <div className="table-responsive">
                <ToastContainer />
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

            {/* Paginación debajo de la tabla  */}
            <div className="pagination">
                <button className={`page-item ${links[0].url == null && "d-none"}`} onClick={() => userNext(links[0].url)}>&laquo;</button>

                {links.map(link =>
                    <button className={`${(link.active && "page-item-active")} page-item ${link.label.includes('&') && "d-none"}`} key={link.label} onClick={() => userNext(link.url)}>
                        {(!link.label.includes('&') && link.label)}

                    </button>)}
                <button className={`page-item ${links[links.length - 1].url == null && "d-none"}`} onClick={() => userNext(links[links.length - 1].url)} >&raquo;</button>

            </div>

            <ComentariosComponent />

            <button onClick={closeSeccin}>Cerrar Sesión</button>
        </>
    )
}

export default Administracion
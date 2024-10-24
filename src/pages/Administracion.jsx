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
    const [links, setLink] = useState([])

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
    console.log(links);
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
    return (
        <div className="div">
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
            <div className="pagination">
            </div>
            <ComentariosComponent />
            <button onClick={closeSeccin}>Cerrar Sesión</button>
        </div>
    )
}

export default Administracion
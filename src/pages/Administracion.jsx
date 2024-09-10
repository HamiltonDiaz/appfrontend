import React from 'react'
import { useNavigate } from 'react-router-dom'
import { logout } from '../services/AuthService';
import { toast, ToastContainer } from 'react-toastify'
import {useQuery} from '@tanstack/react-query'
// Importar componentes
import FormularioUsuarioComponent from '../components/FormularioUsuarioComponent';
import RegistroUsuarioComponent from '../components/RegistroUsuarioComponent';
import ComentariosComponent from '../components/ComentariosComponent';
import { listUsers } from '../services/UserService';

const Administracion = () => {
    const navigate = useNavigate();


    const closeSeccin = async () => {
        const data = await logout();
        toast.success(data.message);
        localStorage.removeItem('AUTH_TOKEN');
        navigate('/login');

    }

    const {data,isLoading} = useQuery({
        queryKey: ['users'],
        queryFn: listUsers
    });

    if (isLoading) return 'Cargando...'
    
    console.log(data.data);
    
    
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
                        {data.data.map(user=><RegistroUsuarioComponent key={user.id} user={user} />)}
                        
                    </tbody>
                </table>
            </div>

            {/* Paginación debajo de la tabla  */}
            <div className="pagination">
                <button className="page-item">1</button>
                <button className="page-item">2</button>
                <span>...</span>
                <button className="page-item">10</button>
                <span>10 / page</span>
            </div>

            <ComentariosComponent />

            <button onClick={closeSeccin}>Cerrar Seccion</button>
        </>
    )
}

export default Administracion
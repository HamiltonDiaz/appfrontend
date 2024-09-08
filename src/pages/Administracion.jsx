import React from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { logout } from '../services/AuthService';
import { toast, ToastContainer } from 'react-toastify'

const Administracion = () => {
    const { primer_nombre, primer_apellido, segundo_apellido, email, telefono } = useOutletContext();
    const navigate = useNavigate();


    const closeSeccin = async () => {
        const data = await logout();
        toast.success(data.message);
        localStorage.removeItem('AUTH_TOKEN');
        navigate('/login');

    }
    return (
        <>
            <ToastContainer />
            <h1>Panel de Administración</h1>
            <p>Nombre: {primer_nombre} {primer_apellido} {segundo_apellido}</p>
            <p>Correo Electrónico: {email}</p>
            <p>Teléfono: {telefono}</p>

            <button onClick={closeSeccin}>Cerrar Seccion</button>
        </>
    )
}

export default Administracion
import React from 'react'
import { useAuth } from '../hooks/useAuth';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom'

const AppLayout = () => {
    const { data, isError, isLoading } = useAuth();

    if (isLoading) return 'Cargando...'
    if (isError) {
        localStorage.removeItem('AUTH_TOKEN');
        return <Navigate to="login" />
    }

    return (
        <Outlet context={data} />
    )
}

export default AppLayout
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const AppLayout = () => {
    const { data, isError, isLoading } = useAuth();

    if (isLoading) return 'Cargando...';
    if (isError) {
        localStorage.removeItem('AUTH_TOKEN');
        return <Navigate to="/login" />;
    }

    return (
        <>
            <div className="sidebar">
                <h5>HALADRILUY <i className="bi bi-gem"></i></h5>
                <Link to="/"><i className="bi bi-house"></i> INICIO</Link>
                <Link to="/proyectos">
                    <i className="bi bi-file-earmark-text"></i> Proyectos
                </Link>
                <Link to="/usuarios">
                    <i className="bi bi-people"></i> Usuarios
                </Link>
                <Link to="/user-info">
                    <i className="bi bi-info-circle"></i> User Information
                </Link>
                <Link to="/graficas">
                    <i className="bi bi-bar-chart"></i> Gráficas
                </Link>
                <Link to="/comentarios">
                    <i className="bi bi-chat-left-text"></i> Comentarios
                </Link>
            </div>
            <div className="main-content">
                <div className="topbar-icons">
                    <i className="bi bi-people-fill" style={{ color: "#6A0DAD" }}></i>
                    <i className="bi bi-list-task" style={{ color: "#6A0DAD" }}></i>
                    <i className="bi bi-envelope" style={{ color: "black" }}></i>
                    <i className="bi bi-arrow-repeat" style={{ color: "#6A0DAD" }}></i>
                </div>
                <Outlet context={data} />
            </div>
        </>
    );
};

export default AppLayout;

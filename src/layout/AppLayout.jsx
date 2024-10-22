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

    try {
        return (
            <>
                <div className="sidebar">
                    <h5 className="logo">
                        HALADRILUY <i className="bi bi-gem"></i> {/* Aquí se usa el ícono de diamante */}
                    </h5>
                    <nav>
                        <ul>
                            <li><Link to="/"><i className="bi bi-house"></i> INICIO</Link></li>
                            <li><Link to="/proyectos"><i className="bi bi-file-earmark-text"></i> Proyectos</Link></li>
                            <li><Link to="/usuarios"><i className="bi bi-people"></i> Usuarios</Link></li>
                            <li><Link to="/user-info"><i className="bi bi-info-circle"></i> User Information</Link></li>
                            <li><Link to="/graficas"><i className="bi bi-bar-chart"></i> Gráficas</Link></li>
                            <li><Link to="/comentarios"><i className="bi bi-chat-left-text"></i> Comentarios</Link></li>
                        </ul>
                    </nav>
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
    } catch (error) {
        console.error('Error rendering AppLayout:', error);
        return <div>Error al renderizar AppLayout</div>;
    }
};

export default AppLayout;

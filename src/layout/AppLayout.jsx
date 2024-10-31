import React from 'react'
import { useAuth } from '../hooks/useAuth';
import { useNavigate , Outlet } from 'react-router-dom';
import { logout } from '../services/AuthService';
import { toast} from 'react-toastify'
import { Navigate } from 'react-router-dom'
import SideBar from '../components/SideBar/Sidebar';

const AppLayout = () => {
    const { data, isError, isLoading } = useAuth();
    const navigate = useNavigate();

    if (isLoading) return 'Cargando...'
    if (isError) {
        localStorage.removeItem('AUTH_TOKEN');
        return <Navigate to="login" />
    }
    const closeSession = async () => {
        const data = await logout();
        toast.success(data.message);
        localStorage.removeItem('AUTH_TOKEN');
        navigate('/login');
    }

    return (
      <>
        <SideBar />
        <div className="main-content">
          <div className="topbar-icons">
            {/*                     
                    <i className="bi bi-people-fill" style={{ color: "#6A0DAD" }}></i>
                    <i className="bi bi-list-task" style={{ color: "#6A0DAD" }}></i>
                    <i className="bi bi-envelope" style={{ color: "black" }}></i>
                    <i className="bi bi-arrow-repeat" style={{ color: "#6A0DAD" }}></i> */}
            <i
              className="bi bi-box-arrow-left"
              style={{ color: "red", fontSize: "20px" }}
              onClick={closeSession}
            >
              <span > Salir</span>{" "}
            </i>
          </div>

          <Outlet context={data} />
        </div>
      </>
    );
}

export default AppLayout
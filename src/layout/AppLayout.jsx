import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Outlet } from 'react-router-dom';
import { logout } from '../services/AuthService';
import { toast } from 'react-toastify'
import { Navigate } from 'react-router-dom'
import SideBar from '../components/SideBar/Sidebar';
import Modal from '../components/Modal';

const AppLayout = () => {
  const { data, isError, isLoading } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
          <button className='btn-icon' onClick={openModal}>
            <img src="./user.svg" alt="" />
          </button>
          <i
            className="bi bi-box-arrow-left"
            style={{ color: "red", fontSize: "20px" }}
            onClick={closeSession}
          >
            <span > Salir</span>{" "}
          </i>
        </div>
        <Modal user={data} isOpen={isModalOpen} onClose={closeModal}>
        </Modal>
        <Outlet context={data} />
      </div>
    </>
  );
}

export default AppLayout
import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import FormularioUsuarioComponent from './FormularioUsuarioComponent'

const RegistroUsuarioComponent = ({ user }) => {
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSaveChanges = async (updatedData) => {
        try {
            const token = localStorage.getItem('AUTH_TOKEN'); 
           
            if (!token) {
                alert('No se encontró un token de autenticación. Inicia sesión nuevamente.');
                return;
            }
            
            const response = await fetch(`http://127.0.0.1:8000/api/v1/users/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                alert('Usuario actualizado con éxito');
                handleClose();
                window.location.reload();
            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Error al actualizar el usuario');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const handleDeleteUser = async (userId) => {
        try {
            const token = localStorage.getItem('AUTH_TOKEN');

            if (!token) {
                alert('No se encontró un token de autenticación. Inicia sesión nuevamente.');
                return;
            }

            const response = await fetch(`http://127.0.0.1:8000/api/v1/users/delete/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                alert('Usuario eliminado con éxito');
                window.location.reload();
            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Error al eliminar el usuario');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <>
            <tr>
                <td>{user.numero_identificacion}</td>
                <td>{user.primer_nombre}</td>
                <td>{user.otros_nombres}</td>
                <td>{user.primer_apellido}</td>
                <td>{user.segundo_apellido}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.telefono}</td>
                <td>
                    <button onClick={handleShow} className="action-btn edit-btn"><i className="bi bi-pencil-square"></i></button>
                    <button onClick={() => handleDeleteUser(user.id)} className="action-btn delete-btn"><i className="bi bi-trash"></i></button>
                </td>
            </tr>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Modificar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormularioUsuarioComponent userData={user} onSave={handleSaveChanges} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                   
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default RegistroUsuarioComponent;

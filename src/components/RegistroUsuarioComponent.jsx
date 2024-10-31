import React from "react";
import { Modal, Button } from "react-bootstrap";
import FormularioUsuarioComponent from "./FormularioUsuarioComponent";
import { environment } from "../enviroments/enviroment";

const RegistroUsuarioComponent = ({ user }) => {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSaveChanges = async (updatedData) => {
    try {
      const token = localStorage.getItem("AUTH_TOKEN");

      if (!token) {
        alert(
          "No se encontró un token de autenticación. Inicia sesión nuevamente."
        );
        return;
      }

      const response = await fetch(`${environment.url}/users/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        alert("Usuario actualizado con éxito");
        handleClose();
        window.location.reload();
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Error al actualizar el usuario");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleDeleteUser = async (userId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este registro?")) {
      try {
        const token = localStorage.getItem("AUTH_TOKEN");

        if (!token) {
          alert(
            "No se encontró un token de autenticación. Inicia sesión nuevamente."
          );
          return;
        }

        const response = await fetch(
          `${environment.url}users/delete/${userId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          alert("Usuario eliminado con éxito");
          window.location.reload();
        } else {
          const errorData = await response.json();
          alert(errorData.message || "Error al eliminar el usuario");
        }
      } catch (error) {
        console.error("Error:", error);
      }
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
          <button onClick={handleShow} className="action-btn btn btn-success">
            <span className="bi bi-pencil-square"></span>
          </button>
          <button
            onClick={() => handleDeleteUser(user.id)}
            className="action-btn btn btn-danger"
          >
            <i className="bi bi-trash"></i>
          </button>
        </td>
      </tr>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Modificar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormularioUsuarioComponent
            userData={user}
            onSave={handleSaveChanges}
          />
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

import React from "react";
import { Modal, Button } from "react-bootstrap";
import FormularioUsuarioComponent from "./FormularioUsuarioComponent";
import { environment } from "../enviroments/enviroment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteUser, updateUsers } from "../services/UserService";

const RegistroUsuarioComponent = ({ user }) => {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const queryClient = useQueryClient();

  const eliminar = useMutation({
    mutationFn: deleteUser,
    onError: (err) => {
      toast(err.message);
    },
    onSuccess: (data) => {
      if (!data.success) {
        toast.error(data.message);
      } else {
        queryClient.invalidateQueries("users");
        toast.success(data.message);
      }
    },
  });
  const editar = useMutation({
    mutationFn: updateUsers,
    onError: (err) => {
      toast(err.message);
    },
    onSuccess: (data) => {
      if (!data.success) {
        toast.error(data.message);
      } else {
        queryClient.invalidateQueries("users");
        toast.success(data.message);
        handleClose()
      }
    },
  });

  const handleSaveChanges = async (updatedData) => {
    editar.mutate(updatedData);

  }

  const handleDeleteUser = async (userId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este registro?")) {
      eliminar.mutate(userId);
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

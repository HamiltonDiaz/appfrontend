import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import { editProyect, listProyectById } from "../../services/ProyectService";

const ModalEditProject = ({ project, onClose, showModal }) => {
  const { handleSubmit, register, reset } = useForm();
  const [palabrasClaves, setpalabrasClaves] = useState([]);
  const [palabra, setpalabra] = useState("");
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: editProyect,
    onError: (err) => {
      toast(err.message);
    },
    onSuccess: (data) => {
      if (!data.success) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        queryClient.invalidateQueries("proyect");
        reset();
        setpalabrasClaves([]);
      }
    },
  });


  if (!project) return null;
  const handleKeyDownWord = (e) => {
    if (e.key === "Enter" && palabra.trim() !== "") {
      setpalabrasClaves([...palabrasClaves, palabra]);
      setpalabra("");
    }
  };

  const eliminarpalabra = (e) => {
    const eliminar = e.target.innerText;
    const a = palabrasClaves.filter((pal) => pal != eliminar);
    setpalabrasClaves(a);
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("titulo", data.titulo);
    formData.append("descripcion", data.descripcion);
    palabrasClaves.forEach((pal) => {
      formData.append("palabras_claves[]", pal);
    });
    formData.append("fechainicio", data.fechainicio);
    formData.append("id_categoria", "1");
    if (data.archivo && data.archivo.length > 0)
      formData.append("archivo", data.archivo[0]);
    mutate(formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Este encabezado puede no ser necesario
      },
    });
  };

  return (
    <>
    <ToastContainer />
      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-edit-project modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="modalEditarProyecto">
                Editar Proyecto ({project?.titulo})
              </h1>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              { (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.preventDefault();
                  }}
                >
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-floating mb-3">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Título"
                          {...register("titulo")}
                        />
                        <label htmlFor="floatingInput">Título</label>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="form-floating mb-3">
                        <input
                          className="form-control"
                          type="date"
                          placeholder="Fecha Inicio"
                          {...register("fechainicio")}
                        />
                        <label htmlFor="floatingInput">Fecha Inicio</label>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="form-floating mb-3">
                        <input
                          className="form-control"
                          type="date"
                          placeholder="Fecha Fin"
                          {...register("fechafin")}
                        />
                        <label htmlFor="floatingInput">Fecha Fin</label>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="form-floating mb-3">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Palabras Claves"
                          value={palabra}
                          onChange={(e) => setpalabra(e.target.value)}
                          onKeyDown={handleKeyDownWord}
                        />
                        <label htmlFor="floatingInput">Palabras Claves</label>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="form-floating mb-3">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Descripción"
                          {...register("descripcion")}
                        />
                        <label htmlFor="floatingInput">Descripción</label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-floating mb-3">
                        <input
                          className="form-control"
                          type="file"
                          placeholder="PDF"
                          {...register("archivo")}
                        />
                        <label htmlFor="floatingInput">Archivo PDF</label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12 d-flex justify-content-end">
                      <button className="btn btn-primary">Guardar</button>
                    </div>
                  </div>
                </form>
              )}
              <div
                className="btn-group mt-3"
                role="group"
                aria-label="Basic example"
                style={{ flexWrap: "wrap" }}
              >
                {palabrasClaves.map((chip, index) => (
                  <button
                    type="button"
                    className="btn btn-primary m-1 "
                    style={{ cursor: "not-allowed" }}
                    key={index}
                    onClick={(e) => eliminarpalabra(e)}
                    value={chip}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button type="button" className="btn btn-success">
                Actualizar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalEditProject;

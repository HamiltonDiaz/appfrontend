import React, { useEffect, useState } from "react";
import "./Proyecto.css";
import { Bar, Pie, Line } from "react-chartjs-2";
import "chart.js/auto";
import {
  createProyect,
  deleteProyect,
  listProyect,
  downloadProyect,
} from "../../services/ProyectService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";

const ProyectoPage = () => {
  const { handleSubmit, register, reset } = useForm();
  const [proyecto, setproyecto] = useState([]);
  const [palabrasClaves, setpalabrasClaves] = useState([]);
  const [palabra, setpalabra] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["proyect"],
    queryFn: () => listProyect(),
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createProyect,
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

  const eliminar = useMutation({
    mutationFn: deleteProyect,
    onError: (err) => {
      toast(err.message);
    },
    onSuccess: (data) => {
      if (!data.success) {
        toast.error(data.message);
      } else {
        queryClient.invalidateQueries("proyect");
        toast.success(data.message);
      }
    },
  });

  const descargar = useMutation({
    mutationFn: downloadProyect,
    onError: (err) => {
      toast(err.message);
    },
    onSuccess: (data) => {
      if (!data) {
        toast.error("Error: No se pudo obtener el archivo.");
      } else {
        // Crear una URL para el blob
        const url = window.URL.createObjectURL(data);

        // Abrir el PDF en una nueva pestaña
        window.open(url, "_blank");

        // Liberar la URL del blob después de un tiempo
        setTimeout(() => {
          window.URL.revokeObjectURL(url);
        }, 100);

        // Mostrar mensaje de éxito
        toast.success("Archivo cargado exitosamente");
      }
    },
  });

  if (isLoading) <p>Cargando...</p>;

  useEffect(() => {
    if (!(data == undefined)) {
      setproyecto(data.data);
    }
  }, [data]);

  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Cantidad",
        data: [100, 150, 120, 200, 180],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  const pieData = {
    labels: ["Category A", "Category B"],
    datasets: [
      {
        data: [300, 200],
        backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)"],
      },
    ],
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Metric",
        data: [100, 300, 200, 400, 250],
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  const handleEdit = () => {
    alert("Editar proyecto");
  };

  const handleDelete = (e) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este proyecto?")) {
      eliminar.mutate(e);
    }
  };
  const handleDownload = (e) => {
    descargar.mutate(e);
  };

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
    <div className="project-page">
      <ToastContainer />

      <main className="content">
        <header>
          <h3>Proyectos</h3>
        </header>
        <section className="project-form">
          <div class="accordion accordion-flush" id="accordionFlushExample">
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                >
                  Crear Proyecto
                </button>
              </h2>
              <div
                id="flush-collapseOne"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">
                  <div className="">
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
                            <label htmlFor="floatingInput">
                              Palabras Claves
                            </label>
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
                  </div>
                  <div
                    class="btn-group mt-3"
                    role="group"
                    aria-label="Basic example"
                    style={{ flexWrap: "wrap" }}
                  >
                    {palabrasClaves.map((chip, index) => (
                      <button
                        type="button"
                        class="btn btn-primary m-1 "
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
              </div>
            </div>
          </div>
        </section>
        <section className="project-table">
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Fecha de Inicio</th>
                <th>Fecha de Fin</th>
                <th>Palabras Claves</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proyecto.map((proyecto) => (
                <tr>
                  <td>{proyecto.titulo}</td>
                  <td>{proyecto.fechainicio}</td>
                  <td>{proyecto.fechafin}</td>
                  <td>{proyecto.palabras_claves}</td>
                  <td>{proyecto.descripcion}</td>
                  <td style={{ display: "flex" }} >
                    <button
                      onClick={handleEdit}
                      className="action-btn btn btn-success m-1"
                    >
                      <span className="bi bi-pencil-square"></span>
                    </button>
                    <button
                      onClick={() => handleDelete(proyecto.id)}
                      className="action-btn btn btn-danger m-1"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                    <button
                      onClick={() => handleDownload(proyecto.ruta)}
                      className="action-btn btn btn-info m-1"
                    >
                      <i className="bi bi bi-cloud-arrow-down"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">1 2 3 4 5</div>
        </section>
        <section className="graphs">
          <div className="graph-bar">
            <Bar data={barData} />
          </div>
          <div className="graph-pie">
            <Pie data={pieData} />
          </div>
          <div className="graph-line">
            <Line data={lineData} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProyectoPage;

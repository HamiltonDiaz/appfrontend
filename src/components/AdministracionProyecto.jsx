import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './AdministracionProyecto.css';

import { Bar, Pie, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { createProyect, deleteProyect, listProyect } from '../services/ProyectService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createUser } from '../services/AuthService';
import { toast, ToastContainer } from 'react-toastify';
import { useForm } from 'react-hook-form';

const AdministracionProyecto = () => {

  const { handleSubmit, register, reset } = useForm();

  const [proyecto, setproyecto] = useState([]);

  const [palabrasClaves, setpalabrasClaves] = useState([]);
  const [palabra, setpalabra] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['proyect'],
    queryFn: () => listProyect()
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
        queryClient.invalidateQueries('proyect');
        reset();
        setpalabrasClaves([])
      }
    }
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
        queryClient.invalidateQueries('proyect');
        toast.success(data.message);
      }
    }
  });

  if (isLoading) <p>Cargando...</p>


  useEffect(() => {
    if (!(data == undefined)) {
      setproyecto(data.data)
    }
  }, [data])


  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Cantidad',
        data: [100, 150, 120, 200, 180],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  const pieData = {
    labels: ['Category A', 'Category B'],
    datasets: [
      {
        data: [300, 200],
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
      },
    ],
  };

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Metric',
        data: [100, 300, 200, 400, 250],
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  const handleEdit = () => {
    alert('Editar proyecto');
  };

  const handleDelete = (e) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
      eliminar.mutate(e)


    }
  };


  const handleKeyDownWord = (e) => {
    if (e.key === 'Enter' && palabra.trim() !== '') {
      setpalabrasClaves([...palabrasClaves, palabra])
      setpalabra('')
    }


  }

  const eliminarpalabra = (e) => {
    const eliminar = e.target.innerText;

    const a = palabrasClaves.filter(pal => pal != eliminar)

    setpalabrasClaves(a)

  }


  const builData = () => {


  }

  const onSubmit = (data) => {

    // Asegúrate de no establecer un encabezado 'Content-Type' explícitamente


    const formData = new FormData();
    formData.append('titulo', data.titulo);
    formData.append('descripcion', data.descripcion);
    palabrasClaves.forEach(pal => {
      formData.append('palabras_claves[]', pal);
    })
    formData.append('fechainicio', data.fechainicio);
    formData.append('id_categoria', '1');
    if (data.archivo && data.archivo.length > 0) formData.append('archivo', data.archivo[0]);

    mutate(formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Este encabezado puede no ser necesario
      }
    });

  }


  return (
    <div className="project-page">
      <ToastContainer></ToastContainer>
      <aside className="sidebar">
        <h5 className="logo">
          HALADRILUY <i className="bi bi-gem"></i>
        </h5>
        <nav>
          <ul>
            <li><Link to="/"><i className="bi bi-house-door"></i> INICIO</Link></li>
            <li><Link to="/registros"><i className="bi bi-file-earmark-text"></i> Registros</Link></li>
            <li><Link to="/proyectos"><i className="bi bi-folder"></i> Proyectos</Link></li>
            <li><Link to="/proyecto-information"><i className="bi bi-info-circle"></i> Proyecto information</Link></li>
            <li><Link to="/graficas"><i className="bi bi-bar-chart"></i> Gráficas</Link></li>
          </ul>
        </nav>
      </aside>
      <main className="content">
        <header>
          <h2>PROYECTO</h2>
        </header>
        <section className="project-form">
          <div className="">
            <form onSubmit={handleSubmit(onSubmit)} onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}>
              <div className="row">
                <div className="col-md-4">
                  <div className="form-floating mb-3">
                    <input className="form-control" type="text" placeholder="Título" {...register('titulo')} />
                    <label htmlFor="floatingInput">Título</label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-floating mb-3">
                    <input className="form-control" type="date" placeholder="Fecha Inicio" {...register('fechainicio')} />
                    <label htmlFor="floatingInput">Fecha Inicio</label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-floating mb-3">
                    <input className="form-control" type="date" placeholder="Fecha Fin" {...register('fechafin')} />
                    <label htmlFor="floatingInput">Fecha Fin</label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-floating mb-3">
                    <input className="form-control" type="text" placeholder="Ruta" {...register('ruta')} />
                    <label htmlFor="floatingInput">Ruta</label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-floating mb-3">
                    <input className="form-control" type="text" placeholder="Palabras Claves" value={palabra} onChange={(e) => setpalabra(e.target.value)} onKeyDown={handleKeyDownWord} />
                    <label htmlFor="floatingInput">Palabras Claves</label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-floating mb-3">
                    <input className="form-control" type="text" placeholder="Descripción" {...register('descripcion')} />
                    <label htmlFor="floatingInput">Descripción</label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-floating mb-3">
                    <input className="form-control" type="file" placeholder="PDF" {...register('archivo')} />
                    <label htmlFor="floatingInput">Archivo PDF</label>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <button className="btn btn-primary">Nuevo Proyecto</button>
                </div>
              </div>
            </form>
          </div>
          <div class="btn-group mt-3" role="group" aria-label="Basic example">
            {palabrasClaves.map((chip, index) => (
              <button type="button" class="btn btn-primary mx-1" key={index} onClick={(e) => eliminarpalabra(e)} value={chip} >{chip}</button>
            ))}
          </div>
        </section>
        <section className="project-table">
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Fecha de Inicio</th>
                <th>Fecha de Fin</th>
                <th>Ruta</th>
                <th>Palabras Claves</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proyecto.map(proyecto => (
                <tr>
                  <td>{proyecto.titulo}</td>
                  <td>{proyecto.fechainicio}</td>
                  <td>{proyecto.fechafin}</td>
                  <td>{proyecto.ruta}</td>
                  <td>{proyecto.palabras_claves}</td>
                  <td>{proyecto.descripcion}</td>

                  <td>
                    <button onClick={handleEdit} className="edit-btn">✏️</button>
                    <button onClick={() => handleDelete(proyecto.id)} value={proyecto.id} className="delete-btn"  ><span>🗑️</span></button>
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

export default AdministracionProyecto;

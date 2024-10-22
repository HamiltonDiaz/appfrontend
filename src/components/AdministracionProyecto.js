import React from 'react';
import { Link } from 'react-router-dom';
import './AdministracionProyecto.css';
import { Bar, Pie, Line } from 'react-chartjs-2';
import 'chart.js/auto';

const AdministracionProyecto = () => {

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

const handleDelete = () => {
  if (window.confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
    alert('Proyecto eliminado');
  }
};

return (
    <div className="project-page">
      <aside className="sidebar">
        <h1>HALADRILUY</h1>
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
        <header className="header">
          <h2>PROYECTO</h2>
          <div className="top-icons">
            <i className="bi bi-person"></i>
            <i className="bi bi-list"></i>
            <i className="bi bi-envelope"></i>
          </div>
        </header>
        <section className="project-form">
          <button className="new-project-btn">Nuevo Proyecto</button>
          <div className="form-fields">
            <input type="text" placeholder="Título" />
            <input type="date" placeholder="Fecha de Inicio" />
            <input type="date" placeholder="Fecha de Fin" />
            <input type="text" placeholder="Ruta" />
            <input type="text" placeholder="Palabras Claves" />
            <input type="text" placeholder="Descripción" />
            <button className="search-btn">Buscar</button>
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
              <tr>
                <td>Software</td>
                <td>20/02/2023</td>
                <td>21/08/2023</td>
                <td>******</td>
                <td>...</td>
                <td>...</td>
                <td>
                  <button onClick={handleEdit} className="edit-btn">✏️</button>
                  <button onClick={handleDelete} className="delete-btn">🗑️</button>
                </td>
              </tr>
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

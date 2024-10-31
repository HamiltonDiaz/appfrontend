import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
    <aside className="sidebar">
      <h5 className="logo">
        HALADRILUY <i className="bi bi-gem"></i>
      </h5>
      <nav>
        <ul>
          <li><Link to="/"><i className="bi bi-house-door"></i>Inicio</Link></li>
          <li><Link to="/proyectos"><i className="bi bi-folder"></i> Proyectos</Link></li>
          <li><Link to=""><i className="bi bi-info-circle"></i> Roles</Link></li>
          <li><Link to=""><i className="bi bi-bar-chart"></i> Categorias</Link></li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;

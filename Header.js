// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Importar estilos del Header

const Header = () => {
  return (
    <header>
      <h1>Cuevana 2.0</h1>
      <nav>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/genero">Géneros</Link></li>
          <li><Link to="/director">Directores</Link></li>
          <li><Link to="/productora">Productoras</Link></li>
          <li><Link to="/tipo">Tipos</Link></li>
          <li><Link to="/media">Crear Película</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

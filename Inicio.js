// src/components/Inicio.js
import React from 'react';
import { Link } from 'react-router-dom';

const Inicio = () => {
    return (
        <div>
            <h1>Bienvenido a Cuevana 2.0</h1>
            <p>
                Puedes <Link to="/lista-peliculas">ver la lista de películas aquí</Link>.
            </p>
            <p>
                También puedes <Link to="/lista-generos">ver la lista de géneros de películas aquí</Link>.
            </p>
            <p>
                Además, puedes <Link to="/lista-productoras">ver la lista de productoras aquí</Link>.
            </p>
            <p>
                Puedes <Link to="/lista-tipos">ver la lista de tipos de películas aquí</Link>.
            </p>
            <p>
                Y también puedes <Link to="/lista-directores">ver la lista de directores aquí</Link>.
            </p>
        </div>
    );
};

export default Inicio;

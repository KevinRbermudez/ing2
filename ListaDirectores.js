import React from 'react';
import './ListaDirectores.css';

const ListaDirectores = ({ directores, loading }) => {
    if (loading) {
        return <p>Cargando directores...</p>;
    }

    if (directores.length === 0) {
        return <p>No hay directores disponibles.</p>;
    }

    return (
        <div className="lista-directores">
            <h2>Lista de Directores</h2>
            <ul>
                {directores.map((director) => (
                    <li key={director._id}>
                        {director.nombre} {/* Asumiendo que 'nombre' es la propiedad que contiene el nombre del director */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListaDirectores;

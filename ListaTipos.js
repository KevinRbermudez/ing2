import React from 'react';
import './ListaTipos.css';

const ListaTipos = ({ tipos, loading }) => {
    if (loading) {
        return <p>Cargando tipos...</p>;
    }

    if (tipos.length === 0) {
        return <p>No hay tipos disponibles.</p>;
    }

    return (
        <div className="lista-tipos">
            <h2>Lista de Tipos</h2>
            <ul>
                {tipos.map((tipo) => (
                    <li key={tipo._id}>
                        {tipo.nombre} {/* Asumiendo que 'nombre' es la propiedad que contiene el nombre del tipo */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListaTipos;

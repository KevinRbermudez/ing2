import React from 'react';
import './ListaProductoras.css';

const ListaProductoras = ({ productoras, loading }) => {
    if (loading) {
        return <p>Cargando productoras...</p>;
    }

    if (productoras.length === 0) {
        return <p>No hay productoras disponibles.</p>;
    }

    return (
        <div className="lista-productoras">
            <h2>Lista de Productoras</h2>
            <ul>
                {productoras.map((productora) => (
                    <li key={productora._id}>
                        {productora.nombre} {/* Asumiendo que 'nombre' es la propiedad que contiene el nombre de la productora */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListaProductoras;

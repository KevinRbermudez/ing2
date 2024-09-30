import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ListaGeneros.css'; // Estilos para la lista de géneros

const ListaGeneros = ({ nuevoGenero }) => {
    const [generos, setGeneros] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Función para obtener los géneros desde el servidor
        const fetchGeneros = async () => {
            try {
                const response = await axios.get('http://localhost:3001/router/Genero');
                setGeneros(response.data);
            } catch (error) {
                console.error('Error al obtener géneros:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGeneros(); // Llamamos a la función al cargar el componente
    }, []);

    // Si se agrega un nuevo género, se actualiza la lista
    useEffect(() => {
        if (nuevoGenero && !generos.some(g => g._id === nuevoGenero._id)) {
            setGeneros(prevGeneros => [...prevGeneros, nuevoGenero]);
        }
    }, [nuevoGenero, generos]);

    return (
        <div className="lista-generos-container">
            <h2>Lista de Géneros</h2>
            {loading ? (
                <p>Cargando géneros...</p>
            ) : (
                <>
                    {generos.length > 0 ? (
                        <ul className="genero-list">
                            {generos.map((genero) => (
                                <li key={genero._id} className="genero-item">
                                    <strong>Nombre:</strong> {genero.nombre} <br />
                                    <strong>Estado:</strong> {genero.estado}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No hay géneros disponibles.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default ListaGeneros;

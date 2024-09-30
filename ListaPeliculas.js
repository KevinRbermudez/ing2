import React from 'react';
import './ListaPeliculas.css'; // Archivo CSS para los estilos personalizados

const ListaPeliculas = ({ medias, loading }) => {
    return (
        <div className="lista-peliculas-container">
            <h1>Lista de Películas</h1>
            {loading ? (
                <p className="loading">Cargando películas...</p>
            ) : (
                <ul className="peliculas-list">
                    {medias.length === 0 ? (
                        <p>No hay películas disponibles</p>
                    ) : (
                        medias.map((media) => (
                            <li key={media._id} className="pelicula-item">
                                <div className="pelicula-header">
                                    <h2>{media.titulo}</h2>
                                    <a
                                        href={media.url || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="pelicula-link"
                                    >
                                        Ver más
                                    </a>
                                </div>
                                <div className="pelicula-info">
                                    <p><strong>Género:</strong> {media.genero || 'No disponible'}</p>
                                    <p><strong>Director:</strong> {media.director || 'No disponible'}</p>
                                    <p><strong>Productora:</strong> {media.productora || 'No disponible'}</p>
                                    <p><strong>Tipo:</strong> {media.tipo || 'No disponible'}</p>
                                    <p><strong>Estado:</strong> {media.estado || 'No disponible'}</p>
                                    <p><strong>Sinopsis:</strong> {media.sinopsis || 'Sinopsis no disponible'}</p>
                                    <p><strong>Serial:</strong> {media.serial || 'No disponible'}</p>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
};

export default ListaPeliculas;

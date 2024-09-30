import React, { useState } from 'react';
import './ListaDirectores';

const Director = ({ onAddDirector }) => {
    const [nombre, setNombre] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reiniciar error

        if (!nombre) {
            setError('El nombre es obligatorio.');
            return;
        }

        const newDirector = { nombre }; // Asumiendo que 'nombre' es el campo necesario

        try {
            const response = await fetch('http://localhost:3001/router/Director', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newDirector),
            });

            if (!response.ok) {
                throw new Error('Error al agregar el director.');
            }

            const data = await response.json();
            onAddDirector(data); // Llamar a la función para agregar el director a la lista
            setNombre(''); // Reiniciar el campo de entrada
        } catch (error) {
            console.error('Error al agregar el director:', error);
            setError('Error al agregar el director.'); // Establecer el mensaje de error
        }
    };

    return (
        <div className="director">
            <h2>Agregar Director</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                        type="text"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Agregar Director</button>
            </form>
        </div>
    );
};

export default Director;

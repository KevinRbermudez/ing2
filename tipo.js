import React, { useState } from 'react';
import './ListaTipos.css';

const Tipo = ({ onAddTipo }) => {
    const [nombre, setNombre] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reiniciar error

        if (!nombre) {
            setError('El nombre es obligatorio.');
            return;
        }

        const newTipo = { nombre }; // Asumiendo que 'nombre' es el campo necesario

        try {
            const response = await fetch('http://localhost:3001/router/Tipo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTipo),
            });

            if (!response.ok) {
                throw new Error('Error al agregar el tipo.');
            }

            const data = await response.json();
            onAddTipo(data); // Llamar a la función para agregar el tipo a la lista
            setNombre(''); // Reiniciar el campo de entrada
        } catch (error) {
            console.error('Error al agregar el tipo:', error);
            setError('Error al agregar el tipo.'); // Establecer el mensaje de error
        }
    };

    return (
        <div className="tipo">
            <h2>Agregar Tipo</h2>
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
                <button type="submit">Agregar Tipo</button>
            </form>
        </div>
    );
};

export default Tipo;

import React, { useState } from 'react';
import './ListaProductoras.css';

const Productora = ({ onAddProductora }) => {
    const [nombre, setNombre] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reiniciar error

        if (!nombre) {
            setError('El nombre es obligatorio.');
            return;
        }

        const newProductora = { nombre }; // Asumiendo que 'nombre' es el campo necesario

        try {
            const response = await fetch('http://localhost:3001/router/Productora', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProductora),
            });

            if (!response.ok) {
                throw new Error('Error al agregar la productora.');
            }

            const data = await response.json();
            onAddProductora(data); // Llamar a la función para agregar la productora a la lista
            setNombre(''); // Reiniciar el campo de entrada
        } catch (error) {
            console.error('Error al agregar la productora:', error);
            setError('Error al agregar la productora.'); // Establecer el mensaje de error
        }
    };

    return (
        <div className="productora">
            <h2>Agregar Productora</h2>
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
                <button type="submit">Agregar Productora</button>
            </form>
        </div>
    );
};

export default Productora;

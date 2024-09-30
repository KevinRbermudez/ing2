import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Genero = ({ onAddGenero }) => {
    const [formData, setFormData] = useState({
        nombre: '',      // Campo para el nombre del género
        estado: 'activo' // Estado activo por defecto
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Manejar cambios en el formulario
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? (checked ? 'activo' : 'inactivo') : value,
        });
        clearMessages(); // Limpiar mensajes de error y éxito al cambiar campos
    };

    // Limpiar mensajes de error y éxito
    const clearMessages = () => {
        setErrorMessage('');
        setSuccessMessage('');
    };

    // Validar campos del formulario
    const validateFields = () => {
        const { nombre } = formData;

        if (!nombre) {
            setErrorMessage('El nombre del género es obligatorio.');
            return false;
        }

        return true;
    };

    // Enviar datos del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        clearMessages();
        setIsLoading(true);

        if (!validateFields()) {
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/router/Genero', formData);
            setSuccessMessage('Género agregado exitosamente.');
            onAddGenero(response.data); // Actualizar la lista en el componente padre
            resetForm(); // Limpiar el formulario
        } catch (error) {
            console.error('Error al agregar el género:', error);
            setErrorMessage('Error al agregar el género. Verifique los datos ingresados.');
        } finally {
            setIsLoading(false);
        }
    };

    // Restablecer el formulario
    const resetForm = () => {
        setFormData({
            nombre: '',
            estado: 'activo', // Restablecer al valor por defecto
        });
    };

    // Manejo de mensajes de éxito y error
    useEffect(() => {
        const timer = setTimeout(() => clearMessages(), 3000);
        return () => clearTimeout(timer);
    }, [successMessage, errorMessage]);

    return (
        <div>
            <h1>Agregar Género</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder="Nombre del Género"
                    required
                />
                <label>
                    <input
                        type="checkbox"
                        name="estado"
                        checked={formData.estado === 'activo'}
                        onChange={handleInputChange}
                    />
                    Activo
                </label>
                
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Agregando...' : 'Agregar Género'}
                </button>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
    );
};

export default Genero;

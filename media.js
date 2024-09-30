import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Media = ({ onAddMovie }) => {
    const [formData, setFormData] = useState({
        titulo: '',
        tipo: '',
        productora: '',
        director: '',
        genero: '',
        url: '',
        sinopsis: '',
        serial: '', // Manejar como cadena para evitar errores con inputs vacíos
        estado: '', // Valor por defecto
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Manejar cambios en el formulario
    const handleInputChange = (e) => {
        const { name, value, type } = e.target;

        // Si es un número, usamos valueAsNumber, de lo contrario tomamos el value como cadena
        setFormData({
            ...formData,
            [name]: type === 'number' ? e.target.valueAsNumber || '' : value,
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
        const { titulo, url, serial } = formData;

        if (!titulo || !url) {
            setErrorMessage('Título y URL son campos obligatorios.');
            return false;
        }

        if (serial && serial < 0) {
            setErrorMessage('El serial debe ser un número positivo.');
            return false;
        }

        // Validar el formato de la URL
        const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
        if (!urlPattern.test(url)) {
            setErrorMessage('La URL ingresada no es válida.');
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
            const response = await axios.post('http://localhost:3001/router/Media', formData);
            setSuccessMessage('Película agregada exitosamente.');
            onAddMovie(response.data); // Actualizar la lista en el componente padre
            resetForm(); // Limpiar el formulario
        } catch (error) {
            console.error('Error al agregar la película:', error);
            setErrorMessage('Error al agregar la película. Verifique los datos ingresados.');
        } finally {
            setIsLoading(false);
        }
    };

    // Restablecer el formulario
    const resetForm = () => {
        setFormData({
            titulo: '',
            tipo: '',
            productora: '',
            director: '',
            genero: '',
            url: '',
            sinopsis: '',
            serial: '',
            estado: '', // Restablecer al valor por defecto
        });
    };

    // Manejo de mensajes de éxito y error
    useEffect(() => {
        const timer = setTimeout(() => clearMessages(), 3000);
        return () => clearTimeout(timer);
    }, [successMessage, errorMessage]);

    return (
        <div>
            <h1>Agregar Película</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleInputChange}
                    placeholder="Título"
                    required
                />
                <input
                    type="text"
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleInputChange}
                    placeholder="Tipo"
                />
                <input
                    type="text"
                    name="productora"
                    value={formData.productora}
                    onChange={handleInputChange}
                    placeholder="Productora"
                />
                <input
                    type="text"
                    name="director"
                    value={formData.director}
                    onChange={handleInputChange}
                    placeholder="Director"
                />
                <input
                    type="text"
                    name="genero"
                    value={formData.genero}
                    onChange={handleInputChange}
                    placeholder="Género"
                />
                <input
                    type="url"
                    name="url"
                    value={formData.url}
                    onChange={handleInputChange}
                    placeholder="URL"
                    required
                />
                <textarea
                    name="sinopsis"
                    value={formData.sinopsis}
                    onChange={handleInputChange}
                    placeholder="Sinopsis"
                />
                <input
                    type="number"
                    name="serial"
                    value={formData.serial || ''} // Asegura que no sea null
                    onChange={handleInputChange}
                    placeholder="Serial"
                    min="0"
                />
                <select
                    name="estado"
                    value={formData.estado}
                    onChange={handleInputChange}
                    required
                >
                    <option value="Disponible">Disponible</option>
                    <option value="No disponible">No disponible</option>
                </select>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Agregando...' : 'Agregar Película'}
                </button>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
    );
};

export default Media;

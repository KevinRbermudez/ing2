import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Inicio from './components/Inicio';
import Genero from './components/genero';
import Director from './components/director';
import Productora from './components/productora';
import Tipo from './components/tipo';
import Media from './components/media';
import ListaPeliculas from './components/ListaPeliculas';
import ListaGeneros from './components/ListaGeneros';
import ListaDirectores from './components/ListaDirectores'; // Componente para listar directores
import ListaTipos from './components/ListaTipos'; // Componente para listar tipos
import ListaProductoras from './components/ListaProductoras'; // Componente para listar productoras
import axios from 'axios';

const App = () => {
    const [medias, setMedias] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [directores, setDirectores] = useState([]); // Estado para directores
    const [tipos, setTipos] = useState([]); // Estado para tipos
    const [productoras, setProductoras] = useState([]); // Estado para productoras
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Función para cargar películas desde la API
    const cargarPeliculas = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:3001/router/Media');
            console.log('Películas obtenidas:', response.data);
            setMedias(response.data);
        } catch (error) {
            console.error('Error al cargar las películas:', error);
            setError('Error al cargar las películas.');
            setMedias([]);
        } finally {
            setLoading(false);
        }
    };

    // Función para cargar géneros desde la API
    const cargarGeneros = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:3001/router/Genero');
            console.log('Géneros obtenidos:', response.data);
            setGeneros(response.data);
        } catch (error) {
            console.error('Error al cargar los géneros:', error);
            setError('Error al cargar los géneros.');
            setGeneros([]);
        } finally {
            setLoading(false);
        }
    };

    // Función para cargar directores desde la API
    const cargarDirectores = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:3001/router/Director');
            console.log('Directores obtenidos:', response.data);
            setDirectores(response.data);
        } catch (error) {
            console.error('Error al cargar los directores:', error);
            setError('Error al cargar los directores.');
            setDirectores([]);
        } finally {
            setLoading(false);
        }
    };

    // Función para cargar tipos desde la API
    const cargarTipos = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:3001/router/Tipo');
            console.log('Tipos obtenidos:', response.data);
            setTipos(response.data);
        } catch (error) {
            console.error('Error al cargar los tipos:', error);
            setError('Error al cargar los tipos.');
            setTipos([]);
        } finally {
            setLoading(false);
        }
    };

    // Función para cargar productoras desde la API
    const cargarProductoras = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:3001/router/Productora');
            console.log('Productoras obtenidas:', response.data);
            setProductoras(response.data);
        } catch (error) {
            console.error('Error al cargar las productoras:', error);
            setError('Error al cargar las productoras.');
            setProductoras([]);
        } finally {
            setLoading(false);
        }
    };

    // Usar useEffect para cargar los datos al inicio
    useEffect(() => {
        cargarPeliculas();
        cargarGeneros();
        cargarDirectores();
        cargarTipos();
        cargarProductoras();
    }, []);

    // Función para agregar una nueva película y refrescar la lista
    const handleAddMovie = async (newMovie) => {
        try {
            const response = await axios.post('http://localhost:3001/router/Media', newMovie);
            if (response.status === 201) {
                console.log('Película agregada, datos de respuesta:', response.data);
                setMedias((prevMedias) => [...prevMedias, response.data]);
                setError(null);
            } else {
                setError('Error al agregar la película. Código de estado: ' + response.status);
            }
        } catch (error) {
            console.error('Error al agregar la película:', error);
            let errorMessage = 'Error desconocido';
            if (error.response) {
                errorMessage = error.response.data.message || error.response.statusText || errorMessage;
            } else if (error.message) {
                errorMessage = error.message;
            }
            setError('Error al agregar la película. ' + errorMessage);
        }
    };

    // Función para agregar un nuevo género y refrescar la lista
    const handleAddGenero = (newGenero) => {
        setGeneros((prevGeneros) => [...prevGeneros, newGenero]);
    };

    // Función para agregar un nuevo director y refrescar la lista
    const handleAddDirector = (newDirector) => {
        setDirectores((prevDirectores) => [...prevDirectores, newDirector]);
    };

    // Función para agregar un nuevo tipo y refrescar la lista
    const handleAddTipo = (newTipo) => {
        setTipos((prevTipos) => [...prevTipos, newTipo]);
    };

    // Función para agregar una nueva productora y refrescar la lista
    const handleAddProductora = (newProductora) => {
        setProductoras((prevProductoras) => [...prevProductoras, newProductora]);
    };

    return (
        <div>
            <Header />
            {loading && <p>Cargando datos...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mensaje de error */}

            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/genero" element={<Genero onAddGenero={handleAddGenero} />} />
                <Route path="/director" element={<Director onAddDirector={handleAddDirector} />} /> {/* Pasar función para agregar directores */}
                <Route path="/productora" element={<Productora onAddProductora={handleAddProductora} />} /> {/* Pasar función para agregar productoras */}
                <Route path="/tipo" element={<Tipo onAddTipo={handleAddTipo} />} /> {/* Pasar función para agregar tipos */}
                <Route 
                    path="/media" 
                    element={<Media onAddMovie={handleAddMovie} />} 
                />
                <Route 
                    path="/lista-peliculas" 
                    element={<ListaPeliculas medias={medias} loading={loading} />} 
                />
                <Route 
                    path="/lista-generos" 
                    element={<ListaGeneros generos={generos} loading={loading} />} 
                />
                <Route 
                    path="/lista-directores" 
                    element={<ListaDirectores directores={directores} loading={loading} />} // Pasar directores
                />
                <Route 
                    path="/lista-tipos" 
                    element={<ListaTipos tipos={tipos} loading={loading} />} // Pasar tipos
                />
                <Route 
                    path="/lista-productoras" 
                    element={<ListaProductoras productoras={productoras} loading={loading} />} // Pasar productoras
                />
            </Routes>
        </div>
    );
};

export default App;

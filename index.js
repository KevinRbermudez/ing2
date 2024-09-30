// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Importa BrowserRouter
import './index.css'; // Asegúrate de que este archivo exista
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* Envuelve tu App con BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Si deseas comenzar a medir el rendimiento en tu aplicación, pasa una función
// para registrar resultados (por ejemplo: reportWebVitals(console.log))
// o envía a un punto de análisis. Aprende más: https://bit.ly/CRA-vitals
reportWebVitals();

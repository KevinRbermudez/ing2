// modelos/Genero.js
const mongoose = require('mongoose');

const generoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
    required: true
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now,
    required: true
  },
  estado: {
    type: String,
    enum: ['activo', 'inactivo'],
    required: true
  }
});

module.exports = mongoose.model('Genero', generoSchema);

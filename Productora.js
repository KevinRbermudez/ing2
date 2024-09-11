const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productoraSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  fechaCreacion: {
    type: Date,
    required: true
  },
  fechaActualizacion: {
    type: Date,
    required: true
  },
  estado: {
    type: String,
    enum: ['activo', 'inactivo'], // Asegúrate de que los valores válidos estén aquí
    required: true
  }
});

module.exports = mongoose.model('Productora', productoraSchema);

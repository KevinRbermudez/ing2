const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MediaSchema = new Schema({
  titulo: { type: String, required: true },
  tipo: { type: String, required: false }, // Cambiar a String
  productora: { type: String, required: false }, // Cambiar a String
  director: { type: String, required: false }, // Cambiar a String
  genero: { type: String, required: false }, // Cambiar a String
  url: { type: String, required: true },
  sinopsis: { type: String, required: true },
  serial: { type: Number, required: true },
  fechaCreacion: { type: Date },
  fechaActualizacion: { type: Date },
  estado: { type: String, required: true }
});

module.exports = mongoose.model('Media', MediaSchema);

// modelos/Director.js
const mongoose = require('mongoose');

const DirectorSchema = new mongoose.Schema({
  nombres: { type: String, required: true },
  fechaCreacion: { type: Date, required: true },
  fechaActualizacion: { type: Date, required: true },
  estado: { type: String, required: true }
});

module.exports = mongoose.model('Director', DirectorSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MediaSchema = new Schema({
  titulo: { type: String, required: true },
  tipo: { type: Schema.Types.ObjectId, ref: 'Tipo', required: true },
  productora: { type: Schema.Types.ObjectId, ref: 'Productora', required: true },
  director: { type: Schema.Types.ObjectId, ref: 'Director', required: true },
  genero: { type: Schema.Types.ObjectId, ref: 'Genero', required: true },
  url: { type: String, required: true },
  sinopsis: { type: String, required: true },
  serial: { type: Boolean, required: true }, // Asegúrate de que sea Boolean
  fechaCreacion: { type: Date, default: Date.now },
  fechaActualizacion: { type: Date, default: Date.now },
  estado: { type: String, required: true }
});

module.exports = mongoose.model('Media', MediaSchema);

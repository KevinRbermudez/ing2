const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const mongoose = require('mongoose');



const Genero = require('../Genero');
const Director = require('../Director');
const Productora = require('../Productora');
const Tipo = require('../Tipo');
const Media = require('../Media');

// Función reutilizable para validación y creación de entidad
const createEntityWithValidation = async (Model, data, res, entityName) => {
  try {
    const newEntity = new Model(data);
    await newEntity.save();
    res.status(201).send(`${entityName} creado exitosamente`);
  } catch (error) {
    res.status(500).send(`Error al crear ${entityName}: ${error.message}`);
  }
};

// Función para manejar validaciones de entrada
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
// Rutas para el módulo Género
router.get('/Genero', async (req, res) => {
  try {
    const generos = await Genero.find();
    res.send(generos);
  } catch (error) {
    res.status(500).send('Error al obtener géneros');
  }
});

router.post('/Genero', [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('estado', 'El estado es obligatorio').not().isEmpty(),
  check('fechaCreacion', 'La fecha de creación es obligatoria').isISO8601(),
  check('fechaActualizacion', 'La fecha de actualización es obligatoria').isISO8601(),
], handleValidationErrors, (req, res) => {
  const { nombre, fechaCreacion, fechaActualizacion, estado } = req.body;
  createEntityWithValidation(Genero, { nombre, fechaCreacion, fechaActualizacion, estado }, res, 'Género');
});

router.put('/Genero/:id', [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('estado', 'El estado es obligatorio').not().isEmpty(),
  check('fechaCreacion', 'La fecha de creación es obligatoria').isISO8601(),
  check('fechaActualizacion', 'La fecha de actualización es obligatoria').isISO8601(),
], handleValidationErrors, async (req, res) => {
  const { id } = req.params;
  const { nombre, fechaCreacion, fechaActualizacion, estado } = req.body;
  try {
    const genero = await Genero.findByIdAndUpdate(id, { nombre, fechaCreacion, fechaActualizacion, estado }, { new: true });
    if (!genero) {
      return res.status(404).send('Género no encontrado');
    }
    res.send(genero);
  } catch (error) {
    res.status(500).send('Error al actualizar género');
  }
});

router.delete('/Genero/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Genero.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send('Género no encontrado');
    }
    res.send('Género eliminado');
  } catch (error) {
    res.status(500).send('Error al eliminar género');
  }
});

// Rutas para el módulo Director
router.get('/Director', async (req, res) => {
  try {
    const directores = await Director.find();
    res.send(directores);
  } catch (error) {
    res.status(500).send('Error al obtener directores');
  }
});

router.post('/Director', [
  check('nombres', 'El nombre es obligatorio').not().isEmpty(),
  check('fechaCreacion', 'La fecha de creación es obligatoria').isISO8601(),
  check('fechaActualizacion', 'La fecha de actualización es obligatoria').isISO8601(),
  check('estado', 'El estado es obligatorio').not().isEmpty(),
], handleValidationErrors, (req, res) => {
  const { nombres, fechaCreacion, fechaActualizacion, estado } = req.body;
  createEntityWithValidation(Director, { nombres, fechaCreacion, fechaActualizacion, estado }, res, 'Director');
});

router.put('/Director/:id', [
  check('nombres', 'El nombre es obligatorio').not().isEmpty(),
  check('fechaCreacion', 'La fecha de creación es obligatoria').isISO8601(),
  check('fechaActualizacion', 'La fecha de actualización es obligatoria').isISO8601(),
  check('estado', 'El estado es obligatorio').not().isEmpty(),
], handleValidationErrors, async (req, res) => {
  const { id } = req.params;
  const { nombres, fechaCreacion, fechaActualizacion, estado } = req.body;
  try {
    const director = await Director.findByIdAndUpdate(id, { nombres, fechaCreacion, fechaActualizacion, estado }, { new: true });
    if (!director) {
      return res.status(404).send('Director no encontrado');
    }
    res.send(director);
  } catch (error) {
    res.status(500).send('Error al actualizar director');
  }
});

router.delete('/Director/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Director.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send('Director no encontrado');
    }
    res.send('Director eliminado');
  } catch (error) {
    res.status(500).send('Error al eliminar director');
  }
});

// Rutas para el módulo Productora
router.get('/Productora', async (req, res) => {
  try {
    const productoras = await Productora.find();
    res.send(productoras);
  } catch (error) {
    res.status(500).send('Error al obtener productoras');
  }
});

router.post('/Productora', [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('fechaCreacion', 'La fecha de creación es obligatoria').isISO8601(),
  check('fechaActualizacion', 'La fecha de actualización es obligatoria').isISO8601(),
  check('estado', 'El estado es obligatorio').not().isEmpty(),
], handleValidationErrors, (req, res) => {
  const { nombre, fechaCreacion, fechaActualizacion, estado } = req.body;
  createEntityWithValidation(Productora, { nombre, fechaCreacion, fechaActualizacion, estado }, res, 'Productora');
});

router.put('/Productora/:id', [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('fechaCreacion', 'La fecha de creación es obligatoria').isISO8601(),
  check('fechaActualizacion', 'La fecha de actualización es obligatoria').isISO8601(),
  check('estado', 'El estado es obligatorio').not().isEmpty(),
], handleValidationErrors, async (req, res) => {
  const { id } = req.params;
  const { nombre, fechaCreacion, fechaActualizacion, estado } = req.body;
  try {
    const productora = await Productora.findByIdAndUpdate(id, { nombre, fechaCreacion, fechaActualizacion, estado }, { new: true });
    if (!productora) {
      return res.status(404).send('Productora no encontrada');
    }
    res.send(productora);
  } catch (error) {
    res.status(500).send('Error al actualizar productora');
  }
});

router.delete('/Productora/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Productora.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send('Productora no encontrada');
    }
    res.send('Productora eliminada');
  } catch (error) {
    res.status(500).send('Error al eliminar productora');
  }
});

// Rutas para el módulo Tipo
router.get('/Tipo', async (req, res) => {
  try {
    const tipos = await Tipo.find();
    res.send(tipos);
  } catch (error) {
    res.status(500).send('Error al obtener tipos');
  }
});

router.post('/Tipo', [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('fechaCreacion', 'La fecha de creación es obligatoria').isISO8601(),
  check('fechaActualizacion', 'La fecha de actualización es obligatoria').isISO8601(),
  check('estado', 'El estado es obligatorio').not().isEmpty(),
], handleValidationErrors, (req, res) => {
  const { nombre, fechaCreacion, fechaActualizacion, estado } = req.body;
  createEntityWithValidation(Tipo, { nombre, fechaCreacion, fechaActualizacion, estado }, res, 'Tipo');
});

router.put('/Tipo/:id', [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('fechaCreacion', 'La fecha de creación es obligatoria').isISO8601(),
  check('fechaActualizacion', 'La fecha de actualización es obligatoria').isISO8601(),
  check('estado', 'El estado es obligatorio').not().isEmpty(),
], handleValidationErrors, async (req, res) => {
  const { id } = req.params;
  const { nombre, fechaCreacion, fechaActualizacion, estado } = req.body;
  try {
    const tipo = await Tipo.findByIdAndUpdate(id, { nombre, fechaCreacion, fechaActualizacion, estado }, { new: true });
    if (!tipo) {
      return res.status(404).send('Tipo no encontrado');
    }
    res.send(tipo);
  } catch (error) {
    res.status(500).send('Error al actualizar tipo');
  }
});

router.delete('/Tipo/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Tipo.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send('Tipo no encontrado');
    }
    res.send('Tipo eliminado');
  } catch (error) {
    res.status(500).send('Error al eliminar tipo');
  }
});


// Rutas para el módulo Media (Películas y Series)
router.get('/Media', async (req, res) => {
  try {
    const medias = await Media.find().populate('tipo productora director genero'); // Poblar referencias
    res.send(medias);
  } catch (error) {
    res.status(500).send('Error al obtener medios');
  }
});

// Crear un nuevo medio
router.post('/Media', [
  check('titulo', 'El título es obligatorio').not().isEmpty(),
  check('tipo', 'El tipo es opcional y puede ser cualquier valor').optional(),
  check('productora', 'La productora es opcional y puede ser cualquier valor').optional(),
  check('director', 'El director es opcional y puede ser cualquier valor').optional(),
  check('genero', 'El género es opcional y puede ser cualquier valor').optional(),
  check('url', 'La URL es obligatoria').not().isEmpty(),
  check('sinopsis', 'La sinopsis es obligatoria').not().isEmpty(),
  check('serial', 'El campo serial es obligatorio y debe ser un número').isNumeric(),
  check('fechaCreacion', 'La fecha de creación debe ser una fecha válida').optional().isISO8601(),
  check('fechaActualizacion', 'La fecha de actualización debe ser una fecha válida').optional().isISO8601(),
  check('estado', 'El estado es obligatorio').not().isEmpty(),
], handleValidationErrors, async (req, res) => {
  const { titulo, tipo, productora, director, genero, url, sinopsis, serial, fechaCreacion, fechaActualizacion, estado } = req.body;

  try {
    const newMedia = new Media({
      titulo,
      tipo: tipo || null,  // Permitir cualquier valor
      productora: productora || null,  // Permitir cualquier valor
      director: director || null,  // Permitir cualquier valor
      genero: genero || null,  // Permitir cualquier valor
      url,
      sinopsis,
      serial: Number(serial),
      fechaCreacion,
      fechaActualizacion,
      estado
    });

    await newMedia.save();
    res.status(201).send('Media creado exitosamente');
  } catch (error) {
    res.status(500).send(`Error al crear Media: ${error.message}`);
  }
});


// Actualizar un medio existente
router.put('/Media/:id', [
  check('titulo', 'El título es obligatorio').not().isEmpty(),
  check('tipo', 'El tipo debe ser un ObjectId válido').isMongoId(),
  check('productora', 'La productora debe ser un ObjectId válido').isMongoId(),
  check('director', 'El director debe ser un ObjectId válido').isMongoId(),
  check('genero', 'El género debe ser un ObjectId válido').isMongoId(),
  check('url', 'La URL es obligatoria').not().isEmpty(),
  check('sinopsis', 'La sinopsis es obligatoria').not().isEmpty(),
  check('serial', 'El campo serial es obligatorio y debe ser un número').isNumeric(),
  check('fechaCreacion', 'La fecha de creación debe ser una fecha válida').optional().isISO8601(),
  check('fechaActualizacion', 'La fecha de actualización debe ser una fecha válida').optional().isISO8601(),
  check('estado', 'El estado es obligatorio').not().isEmpty(),
], handleValidationErrors, async (req, res) => {
  const { id } = req.params;
  const { titulo, tipo, productora, director, genero, url, sinopsis, serial, fechaCreacion, fechaActualizacion, estado } = req.body;

  try {
    const updatedMedia = await Media.findByIdAndUpdate(
      id,
      {
        titulo,
        tipo,  // Usa directamente el valor
        productora,  // Usa directamente el valor
        director,  // Usa directamente el valor
        genero,  // Usa directamente el valor
        url,
        sinopsis,
        serial: Number(serial),
        fechaCreacion,
        fechaActualizacion,
        estado
      },
      { new: true }  // Devuelve el documento actualizado
    );

    if (!updatedMedia) {
      return res.status(404).send('Media no encontrado');
    }
    res.send(updatedMedia);
  } catch (error) {
    res.status(500).send(`Error al actualizar Media: ${error.message}`);
  }
});
module.exports = router;

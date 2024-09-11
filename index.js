const express = require('express');
const cors = require('cors');
const { getConnection } = require('./db/db-connect-mongo');
const router = require('./modelos/router/router'); // Ruta correcta para el archivo del router
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json()); // Middleware para parsear JSON
app.use('/router', router); // Utiliza el router importado

getConnection(); // Conectar a la base de datos

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

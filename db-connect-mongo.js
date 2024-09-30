const mongoose = require('mongoose');

const getConnection = async () => {
  try {
    const url = "mongodb+srv://kevinrozoab:123@cluster0.bw1hr.mongodb.net/db-connection-mongosse?retryWrites=true&w=majority&appName=Cluster0";

    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log("Conexión Exitosa a la base de datos");
  } catch (error) {
    console.log("Error en la conexión:", error);
  }
};

module.exports = {
  getConnection
};







     
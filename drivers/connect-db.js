const mongoose = require('mongoose');

const URI = "mongodb+srv://dilangaleano:dilan05@cluster0.5gsaf2i.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(URI, {
  useNewUrlParser: true, // Eliminará la advertencia
  useUnifiedTopology: true // Eliminará la advertencia
})
  .then(() => console.log('Conexión a la base de datos exitosa'))
  .catch(error => console.error(error));

module.exports = mongoose;
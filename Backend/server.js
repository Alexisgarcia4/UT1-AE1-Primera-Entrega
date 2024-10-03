// Importar las librerías necesarias
const express = require('express');
const cors = require('cors');
const app = express();

// Configuración CORS (opcional)
app.use(cors());

// Middleware para procesar las solicitudes con JSON y URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importar la base de datos y sincronizar
const db = require('./models');

// Sincronizar la base de datos
db.sequelize.sync({ alter: true }).then(() => {
  console.log('Sincronización exitosa con la base de datos.');
}).catch((err) => {
  console.log('Error al sincronizar la base de datos:', err);
});

// Configurar el puerto
const PORT = 8080;

// Ruta GET simple para probar que el servidor está funcionando
app.get('/', (req, res) => {
  res.json({ message: '¡Hola, API de Tareas funcionando!' });
});

// Importar las rutas de Tareas
require('./routes/tarea.routes')(app);    

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

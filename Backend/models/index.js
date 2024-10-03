const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config'); 

// Crear la conexión con la base de datos MySQL
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

// Crear el objeto `db` que contendrá los modelos y la conexión
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importar el modelo de Tarea
db.Tarea = require('./Tarea.js')(sequelize, Sequelize); 
module.exports = db;

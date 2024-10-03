// models/Tarea.js
const { DataTypes } = require('sequelize');

// Definimos el esquema de la tabla "Tareas"
module.exports = (sequelize) => {
  const Tarea = sequelize.define('Tarea', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    mensaje: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    prioridad: {
      type: DataTypes.ENUM('alta', 'media', 'baja'),
      allowNull: false,
      defaultValue: 'media',
    },
    hecha: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    
  }, {
    tableName: 'Tareas',
    timestamps: true,
  });

  return Tarea;
};

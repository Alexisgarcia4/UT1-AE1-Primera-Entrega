module.exports = app => {
    const tareas = require('../controllers/tarea.controller');  // Asegúrate que la ruta y el nombre sean correctos

    var router = require('express').Router();

    // Crear una nueva tarea
    router.post("/", tareas.create);

    // Obtener todas las tareas con filtros opcionales
    router.get("/", tareas.findAll);  

    // Obtener una tarea por ID
    router.get("/:id", tareas.findOne);

    // Actualizar una tarea por ID
    router.put("/:id", tareas.update);

    // Eliminar una tarea por ID
    router.delete("/:id", tareas.delete);

    app.use('/api/tareas', router);
};

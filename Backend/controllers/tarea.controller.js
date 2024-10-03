const db = require('../models');
const Tarea = db.Tarea;

const Op = db.Sequelize.Op;

// Crear una nueva tarea
exports.create = (req, res) => {
    const tarea = {
        nombre: req.body.nombre,
        mensaje: req.body.mensaje,
        prioridad: req.body.prioridad,
        hecha: req.body.hecha,
    };

    Tarea.create(tarea)
        .then(data => res.status(201).send(data))
        .catch(err => res.status(500).send({ message: err.message || 'Error al crear la tarea.' }));
};


// Obtener una tarea por ID
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tarea.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró la tarea con id=${id}.`
                });
            }
        })
        .catch(err => res.status(500).send({
            message: err.message || `Error al buscar la tarea con id=${id}.`
        }));
};

// Obtener todas las tareas con filtros opcionales (prioridad, hecha, orden)
exports.findAll = async (req, res) => {
    const { prioridad, hecha, orden } = req.query;  // Leer los parámetros de consulta

    try {
        // Condiciones de búsqueda
        const condiciones = {};  // Dejamos un objeto vacío para agregar filtros condicionales

        // Filtrar por prioridad si está presente
        if (prioridad && prioridad.trim() !== '') {
            condiciones.prioridad = prioridad;
        }

        // Filtrar por estado de completada si está presente
        if (hecha && hecha.trim() !== '') {
            condiciones.hecha = (hecha === 'true');  // Convertir el string a booleano
        }

        // Definir el orden de los resultados
        let ordenFecha = [['createdAt', 'ASC']];  // Por defecto, orden ascendente por fecha

        // Cambiar a descendente si el parámetro `orden` lo indica
        if (orden && orden.trim() !== '' && orden.toLowerCase() === 'desc') {
            ordenFecha = [['createdAt', 'DESC']];
        }

        // Buscar todas las tareas que coincidan con los filtros
        const tareas = await Tarea.findAll({
            where: condiciones,   // Aplicar las condiciones de filtrado
            order: ordenFecha     // Aplicar el orden
        });

        // Devolver los resultados
        if (tareas.length > 0) {
            res.status(200).send(tareas);
        } else {
            res.status(200).send({
                message: 'No se encontraron tareas.',
                data: []  // Devolver un array vacío si no hay tareas
            });
        }
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Error al obtener las tareas.'
        });
    }
};


// Actualizar una tarea por ID
exports.update = (req, res) => {
    const id = req.params.id;

    Tarea.update(req.body, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'La tarea fue actualizada correctamente.'
                });
            } else {
                res.send({
                    message: `No se pudo actualizar la tarea con id=${id}. Tal vez no se encontró o req.body está vacío.`
                });
            }
        })
        .catch(err => res.status(500).send({
            message: err.message || `Error al actualizar la tarea con id=${id}.`
        }));
};

// Eliminar una tarea por ID
exports.delete = (req, res) => {
    const id = req.params.id;

    Tarea.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'La tarea fue eliminada exitosamente.'
                });
            } else {
                res.send({
                    message: `No se pudo eliminar la tarea con id=${id}. Tal vez no se encontró.`
                });
            }
        })
        .catch(err => res.status(500).send({
            message: err.message || `Error al eliminar la tarea con id=${id}.`
        }));
};

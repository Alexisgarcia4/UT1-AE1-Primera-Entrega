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
    const { prioridad, hecha, orden } = req.query;  

    try {
        
        const condiciones = {};  

       
        if (prioridad && prioridad.trim() !== '') {
            condiciones.prioridad = prioridad;
        }

        
        if (hecha && hecha.trim() !== '') {
            condiciones.hecha = (hecha === 'true');  
        }

       
        let ordenFecha = [['createdAt', 'ASC']];  

        
        if (orden && orden.trim() !== '' && orden.toLowerCase() === 'desc') {
            ordenFecha = [['createdAt', 'DESC']];
        }

        
        const tareas = await Tarea.findAll({
            where: condiciones,   
            order: ordenFecha    
        });

        
        if (tareas.length > 0) {
            res.status(200).send(tareas);
        } else {
            res.status(200).send({
                message: 'No se encontraron tareas.',
                data: []  
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

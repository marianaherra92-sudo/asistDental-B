const express = require('express');
const tratamientoController = require('./tratamientoController');
const authMiddleware = require('../../middlewares/authMiddleware');
const checkPermiso = require("../../middlewares/checkPermiso");
const router = express.Router();

router.post('/', authMiddleware, checkPermiso('permisos_tratamientos'), tratamientoController.createTratamiento);
router.get('/:id_plan', authMiddleware, tratamientoController.getTratamiento);
router.get('/paciente/:id_paciente', authMiddleware, tratamientoController.getTratamientosPaciente);
router.put('/:id_plan', authMiddleware,checkPermiso('permisos_tratamientos'), tratamientoController.updateTratamiento);
router.delete('/:id_plan', authMiddleware,checkPermiso('permisos_tratamientos'), tratamientoController.deleteTratamiento);

module.exports = router;

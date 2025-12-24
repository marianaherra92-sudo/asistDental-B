const express = require('express');
const tratamientoController = require('./tratamientoController');
const authMiddleware = require('../../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, tratamientoController.createTratamiento);
router.get('/:id_plan', authMiddleware, tratamientoController.getTratamiento);
router.get('/paciente/:id_paciente', authMiddleware, tratamientoController.getTratamientosPaciente);
router.put('/:id_plan', authMiddleware, tratamientoController.updateTratamiento);
router.delete('/:id_plan', authMiddleware, tratamientoController.deleteTratamiento);

module.exports = router;

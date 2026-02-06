const express = require('express');
const router = express.Router();
const pacienteController = require('./pacienteController');
const authMiddleware = require('../../middlewares/authMiddleware');
const checkPermiso = require('../../middlewares/checkPermiso');

router.post('/', authMiddleware,checkPermiso('permisos_pacientes'), pacienteController.createPaciente);
router.get('/:id', authMiddleware,pacienteController.getPacienteById);
router.get('/clinica/:id_clinica', authMiddleware,pacienteController.getPacientesByClinica);
router.put('/:id', authMiddleware,checkPermiso('permisos_pacientes'), pacienteController.updatePaciente);
router.delete('/:id', authMiddleware,checkPermiso('permisos_pacientes'), pacienteController.deletePaciente);

module.exports = router;

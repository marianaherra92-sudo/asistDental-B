const express = require('express');
const router = express.Router();
const pacienteController = require('./pacienteController');

router.post('/', pacienteController.createPaciente);
router.get('/:id', pacienteController.getPacienteById);
router.get('/clinica/:id_clinica', pacienteController.getPacientesByClinica);
router.put('/:id', pacienteController.updatePaciente);
router.delete('/:id', pacienteController.deletePaciente);

module.exports = router;

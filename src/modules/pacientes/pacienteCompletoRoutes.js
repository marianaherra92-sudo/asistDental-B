const express = require('express');
const pacienteCompletoController = require('./pacienteCompletoController');
const authMiddleware = require('../../middlewares/authMiddleware');
const checkPermiso = require('../../middlewares/checkPermiso');
const router = express.Router();

router.post('/pacientes', authMiddleware,checkPermiso('permisos_pacientes'), pacienteCompletoController.createPaciente);

module.exports = router;

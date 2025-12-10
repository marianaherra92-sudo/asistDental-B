const express = require('express');
const pacienteCompletoController = require('../controllers/pacienteCompletoController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/pacientes', authMiddleware, pacienteCompletoController.createPaciente);

module.exports = router;

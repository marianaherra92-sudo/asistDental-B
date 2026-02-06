const express = require('express');
const consultaController = require('./consultaController');
const authMiddleware = require('../../middlewares/authMiddleware');
const checkPermiso = require("../../middlewares/checkPermiso");

const router = express.Router();

router.post('/', authMiddleware,checkPermiso('permisos_clinica'), consultaController.createConsulta);
router.get('/:id_consulta', authMiddleware, consultaController.getConsulta);
router.get('/paciente/:id_paciente', authMiddleware, consultaController.getConsultasPaciente);
router.put('/consultas/:id_consulta', authMiddleware,checkPermiso('permisos_clinica'), consultaController.updateConsulta);
router.delete('/consultas/:id_consulta', authMiddleware,checkPermiso('permisos_clinica'), consultaController.deleteConsulta);

module.exports = router;

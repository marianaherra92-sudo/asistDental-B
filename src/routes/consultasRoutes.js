const express = require('express');
const consultaController = require('../controllers/consultaController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, consultaController.createConsulta);
router.get('/:id_consulta', authMiddleware, consultaController.getConsulta);
router.get('/paciente/:id_paciente', authMiddleware, consultaController.getConsultasPaciente);
router.put('/consultas/:id_consulta', authMiddleware, consultaController.updateConsulta);
router.delete('/consultas/:id_consulta', authMiddleware, consultaController.deleteConsulta);

module.exports = router;

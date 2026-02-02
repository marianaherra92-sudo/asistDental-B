const express = require('express');
const router = express.Router();
const antecedentesController = require('./antecedentesController');
const authMiddleware = require('../../middlewares/authMiddleware');
const checkPermiso = require('../../middlewares/checkPermiso');

router.post('/', authMiddleware,checkPermiso('permisos_pacientes'), antecedentesController.createAntecedente);
router.put('/:id', authMiddleware,checkPermiso('permisos_pacientes'), antecedentesController.updateAntecedente);
router.delete('/:id', authMiddleware,checkPermiso('permisos_pacientes'), antecedentesController.deleteAntecedente);
router.get('/paciente/:id_paciente', authMiddleware,checkPermiso('permisos_pacientes'), antecedentesController.getAntecedentesByPaciente);

module.exports = router;

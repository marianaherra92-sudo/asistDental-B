const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware');
const checkPermiso = require('../../middlewares/checkPermiso');

const extraoralController = require('./examenExtraoralController');
const intraoralController = require('./examenIntraoralController');

// Extraoral
router.post('/extraoral', authMiddleware,checkPermiso('permisos_pacientes'), extraoralController.createExamenExtraoral);
router.put('/extraoral/:id', authMiddleware,checkPermiso('permisos_pacientes'), extraoralController.updateExamenExtraoral);
router.get('/extraoral/:id_paciente', authMiddleware,checkPermiso('permisos_pacientes'), extraoralController.getExamenExtraoralByUsuario);

// Intraoral
router.post('/intraoral', authMiddleware,checkPermiso('permisos_pacientes'),  intraoralController.createExamenIntraoral);
router.put('/intraoral/:id', authMiddleware,checkPermiso('permisos_pacientes'), intraoralController.updateExamenIntraoral);
router.get('/intraoral/:id_paciente', authMiddleware,checkPermiso('permisos_pacientes'), intraoralController.getExamenIntraoralByUsuario);

module.exports = router;

const express = require('express');
const router = express.Router();

const extraoralController = require('./examenExtraoralController');
const intraoralController = require('./examenIntraoralController');

// Extraoral
router.post('/extraoral', extraoralController.createExamenExtraoral);
router.put('/extraoral/:id', extraoralController.updateExamenExtraoral);
router.get('/extraoral/:id_paciente', extraoralController.getExamenExtraoralByUsuario);

// Intraoral
router.post('/intraoral', intraoralController.createExamenIntraoral);
router.put('/intraoral/:id', intraoralController.updateExamenIntraoral);
router.get('/intraoral/:id_paciente', intraoralController.getExamenIntraoralByUsuario);

module.exports = router;

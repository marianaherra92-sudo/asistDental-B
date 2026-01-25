const express = require('express');
const router = express.Router();
const ConfiguracionClinicaController = require('./configuracionClinicaController');

router.get('/:id', ConfiguracionClinicaController.getByClinica);
router.put('/:id', ConfiguracionClinicaController.updateByClinica);

module.exports = router;

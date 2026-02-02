const express = require('express');
const router = express.Router();
const ConfiguracionClinicaController = require('./configuracionClinicaController');
const authMiddleware = require("../../../middlewares/authMiddleware");
const checkPermiso = require("../../../middlewares/checkPermiso");

router.get('/:id',authMiddleware,checkPermiso('administrar_clinica'), ConfiguracionClinicaController.getByClinica);
router.put('/:id', authMiddleware,checkPermiso('administrar_clinica'),ConfiguracionClinicaController.updateByClinica);

module.exports = router;

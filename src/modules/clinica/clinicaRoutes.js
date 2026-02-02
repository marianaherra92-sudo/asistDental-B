const express = require('express');
const authController = require('../../controllers/authController');
const ClinicaController = require('./clinicaController');
const checkPermiso = require('../../middlewares/checkPermiso');
const authMiddleware = require('../../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', authController.registroClinica);
router.post('/auth/login', authController.login);

router.get(
    '/:id',
    authMiddleware,
    checkPermiso('permisos_clinica'),
    ClinicaController.getById
);

router.put(
    '/:id',
    authMiddleware,
    checkPermiso('permisos_clinica'),
    ClinicaController.update
);

module.exports = router;

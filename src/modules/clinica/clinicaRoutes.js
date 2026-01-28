const express = require('express');
const authController = require('../../controllers/authController');
const ClinicaController = require('./clinicaController');

const router = express.Router();

router.post('/register', authController.registroClinica);
router.post('/auth/login', authController.login);
router.get('/:id', ClinicaController.getById);
router.put('/:id', ClinicaController.update);

module.exports = router;

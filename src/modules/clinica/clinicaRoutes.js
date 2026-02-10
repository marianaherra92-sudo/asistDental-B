const express = require('express');
const authController = require('../../controllers/authController');
const ClinicaController = require('./clinicaController');
const checkPermiso = require('../../middlewares/checkPermiso');
const { subirLogoClinica } = require("../clinica/logoClinicaController");
const upload = require("../../middlewares/upload");
const authMiddleware = require('../../middlewares/authMiddleware');
const router = express.Router();

router.post('/register',authMiddleware, checkPermiso('permisos_clinica'), authController.registroClinica);
router.post('/auth/login', authController.login);

router.get(
    '/:id',
    authMiddleware,
    ClinicaController.getById
);

router.put(
    '/:id',
    authMiddleware,
    checkPermiso('permisos_clinica'),
    ClinicaController.update
);

router.post(
  "/:id/logo",
  upload.single("logo"),
  subirLogoClinica
);

module.exports = router;

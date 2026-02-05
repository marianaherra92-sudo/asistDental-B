const express = require('express');
const RolController = require('../controllers/rolesController');
const authMiddleware = require('../middlewares/authMiddleware');
const checkPermiso = require('../middlewares/checkPermiso');
const router = express.Router();

router.get('/:id_clinica', authMiddleware, checkPermiso('permisos_clinica'), RolController.getRolesByClinica);

module.exports = router;

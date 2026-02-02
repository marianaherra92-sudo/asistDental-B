const express = require('express');
const DentistaController = require('./dentistasController');
const authMiddleware = require("../../middlewares/authMiddleware");
const checkPermiso = require("../../middlewares/checkPermiso");
const router = express.Router();

router.get('/:id_clinica', authMiddleware,checkPermiso('permisos_clinica'), DentistaController.getAllByClinica);
router.post('/', authMiddleware,checkPermiso('permisos_clinica'), DentistaController.create);
router.put('/:id', authMiddleware,checkPermiso('permisos_clinica'), DentistaController.update);
router.patch('/:id/status', authMiddleware,checkPermiso('permisos_clinica'), DentistaController.inactivarDentista);

module.exports = router;

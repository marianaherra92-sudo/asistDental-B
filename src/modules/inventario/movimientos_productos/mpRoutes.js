const express = require('express');
const router = express.Router();

const controller = require('./mpController');
const authMiddleware = require("../../../middlewares/authMiddleware");
const checkPermiso = require("../../../middlewares/checkPermiso");

router.post('/', authMiddleware,checkPermiso('permisos_clinica'),controller.create);

router.get('/clinica/:id_clinica', authMiddleware,checkPermiso('administrar_clinica'),controller.getAllByClinica);

router.get('/:id',authMiddleware,checkPermiso('administrar_clinica'), controller.getById);

router.put('/:id',authMiddleware,checkPermiso('administrar_clinica'), controller.update);


module.exports = router;

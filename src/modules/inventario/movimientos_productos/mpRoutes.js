const express = require('express');
const router = express.Router();

const controller = require('./mpController');
const authMiddleware = require("../../../middlewares/authMiddleware");
const checkPermiso = require("../../../middlewares/checkPermiso");

router.post('/', authMiddleware,controller.create);

router.get('/clinica/:id_clinica', authMiddleware,controller.getAllByClinica);

router.get('/:id',authMiddleware,controller.getById);

router.put('/:id',authMiddleware,checkPermiso('administrar_clinica'), controller.update);


module.exports = router;

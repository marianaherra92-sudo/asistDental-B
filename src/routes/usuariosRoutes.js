const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post( '/', authMiddleware, usuariosController.createUsuario);

router.get('/', authMiddleware, usuariosController.getUsuariosByClinica);

router.put('/:id', authMiddleware, usuariosController.updateUsuario);

router.patch('/:id/estado', authMiddleware, usuariosController.activarUsuarios
);


module.exports = router;

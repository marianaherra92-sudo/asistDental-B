const express = require('express');
const DentistaController = require('./dentistasController');
const router = express.Router();

router.get('/:id_clinica', DentistaController.getAllByClinica); 
router.post('/', DentistaController.create);
router.put('/:id', DentistaController.update);
router.patch('/:id/status', DentistaController.inactivarDentista);

module.exports = router;

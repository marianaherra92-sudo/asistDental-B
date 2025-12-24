const express = require('express');
const DentistaController = require('./dentistasController');
const router = express.Router();

router.get('/:id_clinica', DentistaController.getAllByClinica); 

module.exports = router;

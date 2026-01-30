const express = require('express');
const router = express.Router();

const controller = require('./mpController');

router.post('/', controller.create);

router.get('/clinica/:id_clinica', controller.getAllByClinica);

router.get('/:id', controller.getById);

router.put('/:id', controller.update);


module.exports = router;

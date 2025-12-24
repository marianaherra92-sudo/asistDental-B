const express = require('express');
const router = express.Router();
const antecedentesController = require('./antecedentesController');

router.post('/', antecedentesController.createAntecedente);
router.put('/:id', antecedentesController.updateAntecedente);
router.delete('/:id', antecedentesController.deleteAntecedente);
router.get('/paciente/:id_paciente', antecedentesController.getAntecedentesByPaciente);

module.exports = router;

const express = require("express");
const router = express.Router();
const PagosController = require("./pagosController");

router.get('/', PagosController.getPagos);
router.get('/:id', PagosController.getPagoById);
router.post('/', PagosController.createPago);
router.put('/:id', PagosController.updatePago);
router.delete('/:id', PagosController.deletePago);
router.get('/paciente/:id_paciente', PagosController.getPagosByPaciente);

module.exports = router;

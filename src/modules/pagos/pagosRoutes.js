const express = require("express");
const router = express.Router();
const PagosController = require("./pagosController");

router.get('/', PagosController.getPagos);
router.get('/:id', PagosController.getPagoById);
router.get('/allPayments/:id_paciente', PagosController.getPagosPorPaciente);
router.post('/', PagosController.createPago);
router.put('/:id', PagosController.updatePago);
router.delete('/:id', PagosController.deletePago);
router.get('/paciente/:id_paciente', PagosController.getPagosByPaciente);
router.get(
    '/clinica/:id_clinica/resumen',
    PagosController.getResumenPagosClinica
);
module.exports = router;

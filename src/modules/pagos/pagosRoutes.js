const express = require("express");
const router = express.Router();
const PagosController = require("./pagosController");
const authMiddleware = require("../../middlewares/authMiddleware");
const checkPermiso = require("../../middlewares/checkPermiso");

router.get('/',authMiddleware, PagosController.getPagos);
router.get('/:id',authMiddleware, PagosController.getPagoById);
router.get('/allPayments/:id_paciente',authMiddleware,PagosController.getPagosPorPaciente);
router.post('/',authMiddleware,checkPermiso('permisos_clinica'), PagosController.createPago);
router.put('/:id',authMiddleware,checkPermiso('permisos_clinica'), PagosController.updatePago);
router.delete('/:id',authMiddleware,checkPermiso('permisos_clinica'), PagosController.deletePago);
router.get('/paciente/:id_paciente',authMiddleware, PagosController.getPagosByPaciente);
router.get(
    '/clinica/:id_clinica/resumen',
    authMiddleware,
    PagosController.getResumenPagosClinica
);
module.exports = router;

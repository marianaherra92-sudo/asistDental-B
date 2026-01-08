const express = require('express');
const router = express.Router();
const CuotasController = require('./cuotasController');

router.get('/', CuotasController.getCuotas);
router.get('/:id_cuota', CuotasController.getCuotaById);
router.get('/plan/:id_plan', CuotasController.getCuotasByPlan);
router.get('/paciente/:id_paciente', CuotasController.getCuotasByPaciente);
router.post('/', CuotasController.createCuota);
router.post('/bulk', CuotasController.createManyCuotas);
router.put('/:id_cuota', CuotasController.updateCuota);
router.delete('/:id_cuota', CuotasController.deleteCuota);

module.exports = router;

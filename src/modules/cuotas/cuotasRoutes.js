const express = require('express');
const router = express.Router();
const CuotasController = require('./cuotasController');
const authMiddleware = require("../../middlewares/authMiddleware");
const checkPermiso = require("../../middlewares/checkPermiso");

router.get('/', authMiddleware,checkPermiso('permisos_clinica'),CuotasController.getCuotas);
router.get('/:id_cuota',authMiddleware,checkPermiso('permisos_clinica'), CuotasController.getCuotaById);
router.get('/plan/:id_plan',authMiddleware,checkPermiso('permisos_clinica'), CuotasController.getCuotasByPlan);
router.get('/paciente/:id_paciente',authMiddleware,checkPermiso('permisos_clinica'), CuotasController.getCuotasByPaciente);
router.post('/', authMiddleware,checkPermiso('permisos_clinica'),CuotasController.createCuota);
router.post('/bulk', authMiddleware,checkPermiso('permisos_clinica'),CuotasController.createManyCuotas);
router.put('/:id_cuota', authMiddleware,checkPermiso('permisos_clinica'),CuotasController.updateCuota);
router.delete('/:id_cuota',authMiddleware,checkPermiso('permisos_clinica'), CuotasController.deleteCuota);

module.exports = router;

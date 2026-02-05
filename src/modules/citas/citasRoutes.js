const router = require('express').Router();
const ctrl = require('./citasController');
const authMiddleware = require('../../middlewares/authMiddleware');
const checkPermiso = require('../../middlewares/checkPermiso');

router.post('/', authMiddleware,checkPermiso('permisos_pacientes'), ctrl.create);
router.get('/', authMiddleware,checkPermiso('permisos_pacientes'), ctrl.listByDate);
router.get('/week', authMiddleware,checkPermiso('permisos_pacientes'), ctrl.listByWeek);
router.get('/month', authMiddleware,checkPermiso('permisos_pacientes'), ctrl.listByMonth);

router.patch('/:id/cancelar', authMiddleware,checkPermiso('permisos_pacientes'), ctrl.cancelar);
router.patch('/:id/confirmar', authMiddleware,checkPermiso('permisos_pacientes'), ctrl.confirmar);
router.patch('/:id/completar', authMiddleware,checkPermiso('permisos_pacientes'), ctrl.completar);
router.patch('/:id/reagendar', authMiddleware,checkPermiso('permisos_pacientes'), ctrl.reagendar);
router.get('/paciente/:id_paciente', authMiddleware,checkPermiso('permisos_pacientes'), ctrl.listByPaciente);

module.exports = router;
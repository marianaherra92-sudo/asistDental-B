const router = require('express').Router();
const ctrl = require('./agendaController');
const authMiddleware = require('../../middlewares/authMiddleware');
const checkPermiso = require('../../middlewares/checkPermiso');

router.post('/', authMiddleware,checkPermiso('permisos_pacientes'), ctrl.create);
router.get('/:id_clinica', authMiddleware,checkPermiso('permisos_pacientes'), ctrl.list);

module.exports = router;

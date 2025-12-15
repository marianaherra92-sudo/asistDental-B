const router = require('express').Router();
const ctrl = require('../controllers/citasController');

router.post('/', ctrl.create);
router.get('/', ctrl.listByDate);
router.get('/week', ctrl.listByWeek);
router.get('/month', ctrl.listByMonth);

router.patch('/:id/cancelar', ctrl.cancelar);
router.patch('/:id/confirmar', ctrl.confirmar);
router.patch('/:id/completar', ctrl.completar);
router.patch('/:id/reagendar', ctrl.reagendar);

module.exports = router;

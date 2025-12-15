const router = require('express').Router();
const ctrl = require('../controllers/agendaController');

router.post('/', ctrl.create);
router.get('/:id_clinica', ctrl.list);

module.exports = router;

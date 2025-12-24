const express = require('express');
const router = express.Router();
const catalogoController = require('./catalogoProcedimientosController');

router.get('/', catalogoController.getCatalogos);
router.get('/:id', catalogoController.getCatalogo);
router.get('/:id_clinica', catalogoController.getCatalogoByClinica);
router.post('/', catalogoController.createCatalogo);
router.put('/:id', catalogoController.updateCatalogo);
router.delete('/:id', catalogoController.deleteCatalogo);

module.exports = router;

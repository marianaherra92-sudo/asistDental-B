const express = require('express');
const router = express.Router();
const catalogoController = require('./catalogoProcedimientosController');
const authMiddleware = require("../../middlewares/authMiddleware");
const checkPermiso = require("../../middlewares/checkPermiso");

router.get('/',authMiddleware, catalogoController.getCatalogos);
router.get('/:id',authMiddleware, catalogoController.getCatalogo);
router.get('/clinica/:id_clinica', authMiddleware,catalogoController.getCatalogoByClinica);
router.post('/',authMiddleware,checkPermiso('permisos_clinica'), catalogoController.createCatalogo);
router.put('/:id',authMiddleware,checkPermiso('permisos_clinica'), catalogoController.updateCatalogo);
router.delete('/:id',authMiddleware,checkPermiso('permisos_clinica'), catalogoController.deleteCatalogo);

module.exports = router;

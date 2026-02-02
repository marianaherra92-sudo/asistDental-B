const express = require("express");
const CatalogoDiagnosticosController = require("./diagnosticosController");
const authMiddleware = require("../../middlewares/authMiddleware");
const checkPermiso = require("../../middlewares/checkPermiso");
const router = express.Router();

router.get("/",authMiddleware,checkPermiso('permisos_clinica'), CatalogoDiagnosticosController.getAll);
router.get("/:id",authMiddleware,checkPermiso('permisos_clinica'), CatalogoDiagnosticosController.getById);
router.post("/", authMiddleware,checkPermiso('permisos_clinica'),CatalogoDiagnosticosController.create);
router.put("/:id", authMiddleware,checkPermiso('permisos_clinica'),CatalogoDiagnosticosController.update);
router.delete("/:id", authMiddleware,checkPermiso('permisos_clinica'),CatalogoDiagnosticosController.remove);

module.exports = router;
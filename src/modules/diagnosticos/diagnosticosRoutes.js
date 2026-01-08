const express = require("express");
const CatalogoDiagnosticosController = require("./diagnosticosController");
const router = express.Router();

router.get("/", CatalogoDiagnosticosController.getAll);
router.get("/:id", CatalogoDiagnosticosController.getById);
router.post("/", CatalogoDiagnosticosController.create);
router.put("/:id", CatalogoDiagnosticosController.update);
router.delete("/:id", CatalogoDiagnosticosController.remove);

module.exports = router;
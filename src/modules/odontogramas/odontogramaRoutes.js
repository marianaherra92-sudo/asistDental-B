const express = require("express");
const controller = require("./odontogramaController");
const router = express.Router();

router.post("/", controller.create);
router.get("/paciente/:idPaciente", controller.listByPaciente);
router.get("/:id", controller.getFull);
router.put("/:id", controller.update);
router.delete("/:id", controller.archive);

router.post("/:id/diagnosticos", controller.addDiagnostico);
router.delete("/diagnosticos/:id", controller.deleteDiagnostico);

router.post("/:id/procedimientos", controller.addProcedimiento);

router.post("/:id/versiones", controller.createVersion);

module.exports = router;
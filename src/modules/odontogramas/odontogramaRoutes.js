const express = require("express");
const controller = require("./odontogramaController");
const authMiddleware = require("../../middlewares/authMiddleware");
const checkPermiso = require("../../middlewares/checkPermiso");
const router = express.Router();

router.post("/",authMiddleware,checkPermiso('permisos_odontograma'), controller.create);
router.get("/paciente/:idPaciente",authMiddleware,checkPermiso('permisos_odontograma'), controller.listByPaciente);
router.get("/:id",authMiddleware,checkPermiso('permisos_odontograma'), controller.getFull);
router.put("/:id",authMiddleware,checkPermiso('permisos_odontograma'), controller.update);
router.put("/:id/archive",authMiddleware,checkPermiso('permisos_odontograma'), controller.archive);

router.post("/:id/diagnosticos", authMiddleware,checkPermiso('permisos_odontograma'),controller.addDiagnostico);
router.delete("/diagnosticos/:id", authMiddleware,checkPermiso('permisos_odontograma'),controller.deleteDiagnostico);

router.post("/:id/procedimientos", authMiddleware,checkPermiso('permisos_odontograma'),controller.addProcedimiento);

router.post("/:id/versiones", authMiddleware,checkPermiso('permisos_odontograma'),controller.createVersion);

module.exports = router;
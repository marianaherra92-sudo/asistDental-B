const express = require("express");
const controller = require("./productosController");
const authMiddleware = require("../../../middlewares/authMiddleware");
const checkPermiso = require("../../../middlewares/checkPermiso");

const router = express.Router();

router.get("/clinica/:id_clinica", authMiddleware,checkPermiso('permisos_inventario'),controller.getAllByClinica);
router.get("/:id", authMiddleware,checkPermiso('permisos_inventario'),controller.getById);
router.post("/", authMiddleware,checkPermiso('permisos_inventario'),controller.create);
router.put("/:id", authMiddleware,checkPermiso('permisos_inventario'),controller.update);
router.delete("/:id", authMiddleware,checkPermiso('permisos_inventario'),controller.remove);
router.get("/clinica/:id_clinica/low-stock", authMiddleware,checkPermiso('permisos_inventario'),controller.getLowStock);
router.get("/clinica/:id_clinica/expiring", authMiddleware,checkPermiso('permisos_inventario'),controller.getExpiring);
router.get("/clinica/:id_clinica/dashboard",authMiddleware,checkPermiso('permisos_inventario'), controller.getDashboardStats);

module.exports = router;

const express = require("express");
const controller = require("./lotesController");
const authMiddleware = require("../../../middlewares/authMiddleware");
const checkPermiso = require("../../../middlewares/checkPermiso");

const router = express.Router();

router.get("/producto/:id_producto",authMiddleware,controller.getByProducto);
router.get("/clinica/:id_clinica", authMiddleware,controller.getAllByClinica);
router.post("/", authMiddleware,checkPermiso('permisos_inventario'),controller.create);
router.put("/:id", authMiddleware,checkPermiso('permisos_inventario'),controller.update);
router.delete("/:id", authMiddleware,checkPermiso('permisos_inventario'),controller.remove);

module.exports = router;

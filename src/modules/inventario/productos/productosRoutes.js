const express = require("express");
const controller = require("./productosController");

const router = express.Router();

router.get("/clinica/:id_clinica", controller.getAllByClinica);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);
router.get("/clinica/:id_clinica/low-stock", controller.getLowStock);
router.get("/clinica/:id_clinica/expiring", controller.getExpiring);
router.get("/clinica/:id_clinica/dashboard", controller.getDashboardStats);

module.exports = router;

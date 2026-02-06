const express = require("express");
const router = express.Router();
const controller = require("./planesPagoController");
const authMiddleware = require("../../../middlewares/authMiddleware");
const checkPermiso = require("../../../middlewares/checkPermiso");

router.get("/clinica/:id",authMiddleware, controller.listarPorClinica);

module.exports = router;

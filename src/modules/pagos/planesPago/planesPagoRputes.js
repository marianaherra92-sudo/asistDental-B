const express = require("express");
const router = express.Router();
const controller = require("./planesPagoController");

router.get("/clinica/:id", controller.listarPorClinica);

module.exports = router;

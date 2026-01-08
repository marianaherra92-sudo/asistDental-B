const express = require("express");
const router = express.Router();
const PagosController = require("./pagosController");

router.post("/", PagosController.registrarPago);
router.get("/paciente/:id", PagosController.listarPorPaciente);

module.exports = router;

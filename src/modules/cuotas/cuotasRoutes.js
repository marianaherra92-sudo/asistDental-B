const express = require("express");
const router = express.Router();
const CuotasController = require("./cuotasController");

router.post("/", CuotasController.crearCuotas);
router.get("/tratamiento/:id", CuotasController.listarPorTratamiento);

module.exports = router;

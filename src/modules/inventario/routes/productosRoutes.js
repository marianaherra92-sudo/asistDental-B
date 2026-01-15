const express = require("express");
const controller = require("../controllers/productosController");

const router = express.Router();

router.get("/clinica/:id_clinica", controller.getAllByClinica);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;

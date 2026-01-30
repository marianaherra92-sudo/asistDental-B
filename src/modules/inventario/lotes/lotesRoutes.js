const express = require("express");
const controller = require("./lotesController");

const router = express.Router();

router.get("/producto/:id_producto", controller.getByProducto);
router.get("/clinica/:id_clinica", controller.getAllByClinica);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;

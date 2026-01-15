const express = require("express");
const controller = require("../controllers/lotesController");

const router = express.Router();

router.get("/producto/:id_producto", controller.getByProducto);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;

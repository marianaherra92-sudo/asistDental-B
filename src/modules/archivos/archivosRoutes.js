const express = require("express");
const { subirArchivo, listarArchivos } = require("./archivosController");
const upload = require("../../middlewares/upload"); // 👈 nuevo multer

const router = express.Router();

// 📄 Subir cualquier archivo (PDF, imagen, etc)
router.post(
    "/",
    upload.single("archivo"),
    subirArchivo
);

// 📄 Listar archivos
router.get("/listar", listarArchivos);

module.exports = router;

const express = require("express");
const { subirArchivo, listarArchivos } = require("./archivosController");
const { uploadImage, uploadDocument } = require("../../middlewares/upload");

const router = express.Router();

router.post(
    "/imagen",
    uploadImage.single("archivo"),
    subirArchivo
);

router.post(
    "/documento",
    uploadDocument.single("archivo"),
    subirArchivo
);

router.get('/listar', listarArchivos);

module.exports = router;

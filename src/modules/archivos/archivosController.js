const { guardarArchivo, obtenerArchivos } = require("./archivosModel");

const subirArchivo = async (req, res) => {
    try {
        const {
            id_consulta,
            id_paciente,
            tipo,
            descripcion
        } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "Archivo requerido" });
        }

        // Cloudinary devuelve la URL aquí
        const url_archivo = req.file.path;

        await guardarArchivo({
            id_consulta,
            id_paciente,
            tipo,
            url_archivo,
            nombre_archivo: req.file.originalname,
            descripcion,
        });

        res.json({
            message: "Archivo subido correctamente",
            url: url_archivo,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al subir archivo" });
    }
};

const listarArchivos = async (req, res) => {
    try {
        const { id_consulta, id_paciente } = req.query; // opcional filtrar

        const archivos = await obtenerArchivos({ id_consulta, id_paciente });

        res.json({ archivos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener archivos' });
    }
};

module.exports = {
    subirArchivo,
    listarArchivos
};

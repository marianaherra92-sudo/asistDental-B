const supabase = require("../../config/supabase");
const { guardarArchivo, obtenerArchivos } = require("./archivosModel");

const subirArchivo = async (req, res) => {
    try {
        const { id_consulta, id_paciente, tipo, descripcion } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: "Archivo requerido" });
        }

        const filePath = `archivos/${Date.now()}-${file.originalname}`;

        const { error } = await supabase.storage
            .from("archivos")
            .upload(filePath, file.buffer, {
                contentType: file.mimetype,
            });

        if (error) throw error;

        const { data } = supabase.storage
            .from("archivos")
            .getPublicUrl(filePath);

        const url_archivo = data.publicUrl;

        await guardarArchivo({
            id_consulta,
            id_paciente,
            tipo,
            url_archivo,
            nombre_archivo: file.originalname,
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
        const { id_consulta, id_paciente } = req.query;
        const archivos = await obtenerArchivos({ id_consulta, id_paciente });
        res.json({ archivos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener archivos" });
    }
};

module.exports = {
    subirArchivo,
    listarArchivos,
};

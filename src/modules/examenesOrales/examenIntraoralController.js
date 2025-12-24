const ExamenIntraoral = require('./examenInicialIntraoralModel');
const db = require('../../config/db');

exports.createExamenIntraoral = async (req, res) => {
    try {
        const id_insertado = await ExamenIntraoral.create(req.body);

        res.status(201).json({
            message: "Examen intraoral creado correctamente",
            id: id_insertado
        });
    } catch (error) {
        console.error("Error al crear examen intraoral:", error);
        res.status(500).json({ error: "Error interno al crear examen intraoral" });
    }
};

exports.updateExamenIntraoral = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.execute(
            `
      UPDATE examen_clinico_inicial_intraoral
      SET encia = ?, orofaringe = ?, lengua = ?, piso_boca = ?, paladar_duro = ?, tipo_oclusion = ?, paladar_blando = ?, reborde_residual = ?
      WHERE id_intraoral = ?
      `,
            [
                req.body.encia || null,
                req.body.orofaringe || null,
                req.body.lengua || null,
                req.body.piso_boca || null,
                req.body.paladar_duro || null,
                req.body.tipo_oclusion || null,
                req.body.paladar_blando || null,
                req.body.reborde_residual || null,
                id
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Examen intraoral no encontrado" });
        }

        res.json({ message: "Examen intraoral actualizado correctamente" });

    } catch (error) {
        console.error("Error al actualizar examen intraoral:", error);
        res.status(500).json({ error: "Error interno al actualizar examen intraoral" });
    }
};

exports.getExamenIntraoralByUsuario = async (req, res) => {
    try {
        const { id_paciente } = req.params;

        const [rows] = await db.execute(
            `
            SELECT *
            FROM examen_clinico_inicial_intraoral
            WHERE id_paciente = ?
            `,
            [id_paciente]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "No se encontró examen intraoral para este usuario" });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error("Error al obtener examen intraoral:", error);
        res.status(500).json({ error: "Error interno al obtener examen intraoral" });
    }
};

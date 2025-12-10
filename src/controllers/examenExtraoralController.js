const ExamenExtraoral = require('../models/examenInicialExtraoralModel');
const db = require('../config/db');

exports.createExamenExtraoral = async (req, res) => {
    try {
        const id_insertado = await ExamenExtraoral.create(req.body);

        res.status(201).json({
            message: "Examen extraoral creado correctamente",
            id: id_insertado
        });
    } catch (error) {
        console.error("Error al crear examen extraoral:", error);
        res.status(500).json({ error: "Error interno al crear examen extraoral" });
    }
};

exports.updateExamenExtraoral = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.execute(
            `
      UPDATE examen_clinico_inicial_extraoral
      SET cabeza = ?, cara = ?, atm = ?, ganglios = ?, labios = ?, senales_particulares = ?
      WHERE id_extraoral = ?
      `,
            [
                req.body.cabeza || null,
                req.body.cara || null,
                req.body.atm || null,
                req.body.ganglios || null,
                req.body.labios || null,
                req.body.senales_particulares || null,
                id
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Examen extraoral no encontrado" });
        }

        res.json({ message: "Examen extraoral actualizado correctamente" });

    } catch (error) {
        console.error("Error al actualizar examen extraoral:", error);
        res.status(500).json({ error: "Error interno al actualizar examen extraoral" });
    }
};

const Antecedentes = require('../models/antecedentesModel');
const db = require('../config/db');

exports.createAntecedente = async (req, res) => {
    try {
        const { id_paciente, id_tipo_antecedente } = req.body;

        if (!id_paciente || !id_tipo_antecedente) {
            return res.status(400).json({
                error: "id_paciente e id_tipo_antecedente son obligatorios"
            });
        }

        const id = await Antecedentes.create(req.body);

        res.status(201).json({
            message: "Antecedente creado correctamente",
            id
        });

    } catch (error) {
        console.error("Error al crear antecedente:", error);
        res.status(500).json({ error: "Error interno al crear antecedente" });
    }
};


exports.updateAntecedente = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_tipo_antecedente } = req.body;

        if (!id_tipo_antecedente) {
            return res.status(400).json({
                error: "id_tipo_antecedente es obligatorio para actualizar"
            });
        }

        const [result] = await db.execute(
            `
      UPDATE antecedentes
      SET id_tipo_antecedente = ?
      WHERE id_antecedente = ?
      `,
            [id_tipo_antecedente, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Antecedente no encontrado" });
        }

        res.json({ message: "Antecedente actualizado correctamente" });

    } catch (error) {
        console.error("Error al actualizar antecedente:", error);
        res.status(500).json({ error: "Error interno al actualizar antecedente" });
    }
};

exports.deleteAntecedente = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.execute(
            `
      DELETE FROM antecedentes
      WHERE id_antecedente = ?
      `,
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Antecedente no encontrado" });
        }

        res.json({ message: "Antecedente eliminado correctamente" });

    } catch (error) {
        console.error("Error al eliminar antecedente:", error);
        res.status(500).json({ error: "Error interno al eliminar antecedente" });
    }
};

exports.getAntecedentesByPaciente = async (req, res) => {
    try {
        const { id_paciente } = req.params;

        if (!id_paciente) {
            return res.status(400).json({
                error: "id_paciente es obligatorio"
            });
        }

        const antecedentes = await Antecedentes.getByPaciente(id_paciente);

        res.json(antecedentes);

    } catch (error) {
        console.error("Error al obtener antecedentes:", error);
        res.status(500).json({ error: "Error interno al obtener antecedentes" });
    }
};

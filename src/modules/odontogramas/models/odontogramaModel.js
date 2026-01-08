const db = require('../../../config/db');

const Odontograma = {
    async create(data, connection = db) {
        const { id_clinica, id_paciente } = data;

        const [result] = await connection.query(
            `INSERT INTO odontogramas (id_clinica, id_paciente, version)
         VALUES (?, ?, 1)`,
            [id_clinica, id_paciente]
        );

        return result.insertId;
    },

    async findByPaciente(id_paciente) {
        const [rows] = await db.query(
            `SELECT *
       FROM odontogramas
       WHERE id_paciente = ?
       ORDER BY fecha_creacion DESC`,
            [id_paciente]
        );
        return rows;
    },

    async findById(id_odontograma) {
        const [[row]] = await db.query(
            `SELECT *
       FROM odontogramas
       WHERE id_odontograma = ?`,
            [id_odontograma]
        );
        return row;
    },

    async update(id_odontograma, data) {
        const { nota_cierre, estado } = data;

        await db.query(
            `UPDATE odontogramas
       SET nota_cierre = ?, estado = ?
       WHERE id_odontograma = ?`,
            [nota_cierre ?? null, estado ?? 'Activo', id_odontograma]
        );
    },

    async archive(id_odontograma) {
        await db.query(
            `UPDATE odontogramas
       SET estado = 'Archivado'
       WHERE id_odontograma = ?`,
            [id_odontograma]
        );
    }
};

module.exports = Odontograma;

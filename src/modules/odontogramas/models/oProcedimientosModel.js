const db = require('../../../config/db');

const OdontogramaProcedimiento = {
    async add(data, connection = db) {
        const {
            id_odontograma,
            id_dentista,
            id_plan,
            id_plan_tratamiento_procedimiento,
            id_diagnostico,
            descripcion
        } = data;

        const [result] = await connection.query(
            `INSERT INTO odontograma_procedimientos
             (id_odontograma, id_dentista, id_plan, id_plan_tratamiento_procedimiento, id_diagnostico, descripcion)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [
                id_odontograma,
                id_dentista,
                id_plan,
                id_plan_tratamiento_procedimiento,
                id_diagnostico,
                descripcion
            ]
        );

        return result.insertId; // ← id_odontograma_procedimiento
    },

    async findByOdontograma(id_odontograma) {
        const [rows] = await db.query(
            `SELECT *
             FROM odontograma_procedimientos
             WHERE id_odontograma = ?`,
            [id_odontograma]
        );
        return rows;
    }
};

module.exports = OdontogramaProcedimiento;

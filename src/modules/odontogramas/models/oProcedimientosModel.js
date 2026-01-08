const db = require('../../../config/db');

const OdontogramaProcedimiento = {
    async add(data) {
        const {
            id_odontograma,
            id_dentista,
            id_plan,
            id_procedimiento_realizado,
            descripcion
        } = data;

        await db.query(
            `INSERT INTO odontograma_procedimientos
      (id_odontograma, id_dentista, id_plan, id_procedimiento_realizado, descripcion)
      VALUES (?, ?, ?, ?, ?)`,
            [
                id_odontograma,
                id_dentista,
                id_plan,
                id_procedimiento_realizado,
                descripcion
            ]
        );
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

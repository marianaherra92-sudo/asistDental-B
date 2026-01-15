const db = require('../../../config/db');

const MaterialUsado = {
    async add(data, connection = db) {
        const {
            id_paciente,
            id_odontograma_procedimiento,
            id_producto,
            id_lote,
            cantidad,
            precio_unitario
        } = data;

        await connection.query(
            `INSERT INTO materiales_usados
             (id_paciente, id_odontograma_procedimiento, id_producto, id_lote, cantidad, precio_unitario)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [
                id_paciente,
                id_odontograma_procedimiento,
                id_producto,
                id_lote,
                cantidad,
                precio_unitario
            ]
        );
    },

    async findByProcedimiento(id_odontograma_procedimiento) {
        const [rows] = await db.query(
            `SELECT *
             FROM materiales_usados
             WHERE id_odontograma_procedimiento = ?`,
            [id_odontograma_procedimiento]
        );
        return rows;
    }
};

module.exports = MaterialUsado;

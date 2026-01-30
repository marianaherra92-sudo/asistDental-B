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
        const [rows] = await db.query(`
        SELECT 
            mu.id_material_usado,
            mu.cantidad,
            mu.precio_unitario,

            p.id_producto,
            p.nombre AS producto_nombre,
            p.descripcion AS producto_descripcion,
            p.unidad_medida,
            p.costo_unitario
        FROM materiales_usados mu
        INNER JOIN productos p
            ON p.id_producto = mu.id_producto
        WHERE mu.id_odontograma_procedimiento = ?
    `, [id_odontograma_procedimiento]);

        return rows;
    }

};

module.exports = MaterialUsado;

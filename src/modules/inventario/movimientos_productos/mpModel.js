const db = require('../../../config/db');

const MovimientosInventario = {
    async getByClinica(id_clinica) {
        const [rows] = await db.query(
            `SELECT 
            mi.*,
            p.nombre AS nombre_producto,
            p.unidad_medida,
            lp.numero_lote,
            lp.fecha_caducidad
        FROM movimientos_inventario mi
        INNER JOIN productos p 
            ON p.id_producto = mi.id_producto
        LEFT JOIN lotes_productos lp 
            ON lp.id_lote = mi.id_lote
        WHERE mi.id_clinica = ?
        ORDER BY mi.fecha_movimiento DESC`,
            [id_clinica]
        );

        return rows;
    },

    async getById(id_movimiento) {
        const [rows] = await db.query(
            `SELECT 
            mi.*,
            p.nombre AS nombre_producto,
            p.unidad_medida,
            lp.numero_lote,
            lp.fecha_caducidad
        FROM movimientos_inventario mi
        INNER JOIN productos p 
            ON p.id_producto = mi.id_producto
        LEFT JOIN lotes_productos lp 
            ON lp.id_lote = mi.id_lote
        WHERE mi.id_movimiento = ?`,
            [id_movimiento]
        );

        return rows[0];
    },

    async getByIdProducto(id_producto) {
        const [rows] = await db.query(
            `SELECT 
            mi.*,
            p.nombre AS nombre_producto,
            lp.numero_lote,
            lp.fecha_caducidad
        FROM movimientos_inventario mi
        INNER JOIN productos p 
            ON p.id_producto = mi.id_producto
        LEFT JOIN lotes_productos lp 
            ON lp.id_lote = mi.id_lote
        WHERE mi.id_producto = ?
        ORDER BY mi.fecha_movimiento DESC`,
            [id_producto]
        );

        return rows;
    },

    async create(data) {
        const {
            id_producto,
            id_clinica,
            id_lote,
            tipo,
            cantidad,
            motivo
        } = data;

        const [result] = await db.query(
            `INSERT INTO movimientos_inventario
       (id_producto, id_clinica, id_lote, tipo, cantidad, motivo)
       VALUES (?, ?, ?, ?, ?, ?)`,
            [id_producto, id_clinica, id_lote || null, tipo, cantidad, motivo || null]
        );

        return result.insertId;
    },

    async update(id, data) {
        const {
            id_producto,
            id_clinica,
            id_lote,
            tipo,
            cantidad,
            motivo
        } = data;

        await db.query(
            `UPDATE movimientos_inventario
       SET id_producto = ?, id_clinica = ?, id_lote = ?, tipo = ?, cantidad = ?, motivo = ?
       WHERE id_movimiento = ?`,
            [id_producto, id_clinica, id_lote || null, tipo, cantidad, motivo || null, id]
        );
    },

    async delete(id) {
        await db.query(
            `DELETE FROM movimientos_inventario WHERE id_movimiento = ?`,
            [id]
        );
    }
};

module.exports = MovimientosInventario;

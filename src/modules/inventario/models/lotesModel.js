const db = require("../../../config/db");

const LotesProductos = {

    async getByProducto(id_producto) {
        const [rows] = await db.query(
            `SELECT * FROM lotes_productos
             WHERE id_producto = ?`,
            [id_producto]
        );
        return rows;
    },

    async create(data) {
        const {
            id_producto,
            numero_lote,
            fecha_caducidad,
            cantidad_inicial
        } = data;

        const [result] = await db.query(
            `INSERT INTO lotes_productos
             (id_producto, numero_lote, fecha_caducidad, cantidad_inicial)
             VALUES (?, ?, ?, ?)`,
            [id_producto, numero_lote, fecha_caducidad, cantidad_inicial]
        );

        return result.insertId;
    },

    async update(id_lote, data) {
        const {
            numero_lote,
            fecha_caducidad,
            cantidad_inicial
        } = data;

        await db.query(
            `UPDATE lotes_productos
             SET numero_lote = ?, fecha_caducidad = ?, cantidad_inicial = ?
             WHERE id_lote = ?`,
            [numero_lote, fecha_caducidad, cantidad_inicial, id_lote]
        );
    },

    async remove(id_lote) {
        await db.query(
            `DELETE FROM lotes_productos WHERE id_lote = ?`,
            [id_lote]
        );
    }
};

module.exports = LotesProductos;

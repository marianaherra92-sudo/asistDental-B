const db = require("../../../config/db");

const LotesProductos = {

    async getByProducto(id_producto) {
        const [rows] = await db.query(
            `SELECT 
            lp.*,
            p.nombre AS nombre_producto,
            COALESCE(sa.stock_disponible, 0) AS stock_lote
        FROM lotes_productos lp
        INNER JOIN productos p 
            ON p.id_producto = lp.id_producto
        LEFT JOIN stock_actual sa 
            ON sa.id_lote = lp.id_lote
        WHERE lp.id_producto = ?`,
            [id_producto]
        );

        return rows;
    },

    async getByClinica(id_clinica) {
        const [rows] = await db.query(
            `SELECT 
            lp.*,
            p.nombre AS nombre_producto,
            COALESCE(sa.stock_disponible, 0) AS stock_lote
        FROM lotes_productos lp
        INNER JOIN productos p 
            ON p.id_producto = lp.id_producto
        LEFT JOIN stock_actual sa 
            ON sa.id_lote = lp.id_lote
        WHERE lp.id_clinica = ?`,
            [id_clinica]
        );

        return rows;
    },

    async create(data) {
        const {
            id_producto,
            id_clinica,
            numero_lote,
            fecha_caducidad,
            cantidad_inicial
        } = data;

        const [result] = await db.query(
            `INSERT INTO lotes_productos
             (id_producto, id_clinica, numero_lote, fecha_caducidad, cantidad_inicial)
             VALUES (?, ?, ?, ?, ?)`,
            [id_producto, id_clinica, numero_lote, fecha_caducidad, cantidad_inicial]
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

const db = require("../../../config/db");

const Productos = {

    async getByClinica(id_clinica) {
        const [rows] = await db.query(
            `SELECT * FROM productos
             WHERE id_clinica = ? AND activo = 1`,
            [id_clinica]
        );
        return rows;
    },

    async getById(id_producto) {
        const [rows] = await db.query(
            `SELECT * FROM productos WHERE id_producto = ?`,
            [id_producto]
        );
        return rows[0];
    },

    async create(data) {
        const {
            id_clinica,
            nombre,
            descripcion,
            unidad_medida,
            costo_unitario
        } = data;

        const [result] = await db.query(
            `INSERT INTO productos
             (id_clinica, nombre, descripcion, unidad_medida, costo_unitario)
             VALUES (?, ?, ?, ?, ?)`,
            [id_clinica, nombre, descripcion, unidad_medida, costo_unitario]
        );

        return result.insertId;
    },

    async update(id_producto, data) {
        const {
            nombre,
            descripcion,
            unidad_medida,
            costo_unitario,
            activo
        } = data;

        await db.query(
            `UPDATE productos
             SET nombre = ?, descripcion = ?, unidad_medida = ?, costo_unitario = ?, activo = ?
             WHERE id_producto = ?`,
            [nombre, descripcion, unidad_medida, costo_unitario, activo, id_producto]
        );
    },

    async softDelete(id_producto) {
        await db.query(
            `UPDATE productos SET activo = 0 WHERE id_producto = ?`,
            [id_producto]
        );
    }
};

module.exports = Productos;

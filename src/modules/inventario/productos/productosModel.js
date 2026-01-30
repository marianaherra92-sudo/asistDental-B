const db = require("../../../config/db");

const Productos = {

    async getByClinica(id_clinica) {
        const [rows] = await db.query(
            `SELECT 
            p.*,
            COALESCE(SUM(sa.stock_disponible), 0) AS stock_actual
        FROM productos p
        LEFT JOIN stock_actual sa 
            ON sa.id_producto = p.id_producto 
            AND sa.id_clinica = p.id_clinica
        WHERE p.id_clinica = ? 
          AND p.activo = 1
        GROUP BY p.id_producto`,
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
    },

    async getLowStock(id_clinica, limite = 10) {
        const [rows] = await db.query(
            `SELECT 
            p.id_producto,
            p.nombre,
            p.descripcion,
            p.unidad_medida,
            SUM(sa.stock_disponible) AS stock_actual,
            p.costo_unitario
        FROM productos p
        JOIN stock_actual sa 
            ON sa.id_producto = p.id_producto
            AND sa.id_clinica = p.id_clinica
        WHERE p.id_clinica = ?
          AND p.activo = 1
        GROUP BY p.id_producto
        HAVING stock_actual <= ?
        ORDER BY stock_actual ASC`,
            [id_clinica, limite]
        );
        return rows;
    },

    async getExpiring(id_clinica, dias = 30) {
        const [rows] = await db.query(
            `SELECT 
            p.id_producto,
            p.nombre,
            lp.id_lote,
            lp.numero_lote,
            lp.fecha_caducidad,
            sa.stock_disponible,
            p.unidad_medida
        FROM lotes_productos lp
        JOIN productos p ON p.id_producto = lp.id_producto
        JOIN stock_actual sa ON sa.id_lote = lp.id_lote
        WHERE lp.id_clinica = ?
          AND p.activo = 1
          AND sa.stock_disponible > 0
          AND lp.fecha_caducidad BETWEEN CURDATE()
          AND DATE_ADD(CURDATE(), INTERVAL ? DAY)
        ORDER BY lp.fecha_caducidad ASC`,
            [id_clinica, dias]
        );
        return rows;
    },

    async getDashboardStats(id_clinica, limite = 10, dias = 30) {

        // 🔹 TOTAL PRODUCTOS
        const [[total]] = await db.query(
            `SELECT COUNT(*) AS total_productos
         FROM productos
         WHERE id_clinica = ?
         AND activo = 1`,
            [id_clinica]
        );

        // 🔹 STOCK BAJO (por producto)
        const [lowStockRows] = await db.query(
            `SELECT p.id_producto
         FROM productos p
         JOIN stock_actual sa 
            ON sa.id_producto = p.id_producto
            AND sa.id_clinica = p.id_clinica
         WHERE p.id_clinica = ?
         AND p.activo = 1
         GROUP BY p.id_producto
         HAVING SUM(sa.stock_disponible) <= ?`,
            [id_clinica, limite]
        );

        // 🔹 PRODUCTOS POR CADUCAR
        const [[expiring]] = await db.query(
            `SELECT COUNT(DISTINCT lp.id_producto) AS productos_por_caducar
         FROM lotes_productos lp
         JOIN stock_actual sa ON sa.id_lote = lp.id_lote
         WHERE lp.id_clinica = ?
         AND sa.stock_disponible > 0
         AND lp.fecha_caducidad BETWEEN CURDATE()
         AND DATE_ADD(CURDATE(), INTERVAL ? DAY)`,
            [id_clinica, dias]
        );

        // 🔹 VALOR TOTAL INVENTARIO
        const [[valor]] = await db.query(
            `SELECT 
            COALESCE(SUM(sa.stock_disponible * p.costo_unitario), 0) AS valor_total
         FROM stock_actual sa
         JOIN productos p ON p.id_producto = sa.id_producto
         WHERE sa.id_clinica = ?
         AND p.activo = 1`,
            [id_clinica]
        );

        return {
            total_productos: total.total_productos,
            productos_stock_bajo: lowStockRows.length,
            productos_por_caducar: expiring.productos_por_caducar,
            valor_total: valor.valor_total
        };
    }

};

module.exports = Productos;

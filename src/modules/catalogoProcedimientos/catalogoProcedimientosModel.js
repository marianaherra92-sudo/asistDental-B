const db = require('../../config/db');

const CatalogoProcedimientos = {

    async create(data) {
        const conn = await db.getConnection();
        try {
            await conn.beginTransaction();

            const [result] = await conn.execute(
                `INSERT INTO catalogo_procedimientos (id_clinica, nombre, descripcion, activo)
                 VALUES (?, ?, ?, ?)`,
                [
                    data.id_clinica,
                    data.nombre,
                    data.descripcion ?? null,
                    data.activo ?? 1
                ]
            );

            const id_procedimiento = result.insertId;

            if (data.precio != null) {
                await conn.execute(
                    `INSERT INTO precios_procedimientos (id_catalogo_procedimiento, precio)
                     VALUES (?, ?)`,
                    [id_procedimiento, data.precio]
                );
            }

            await conn.commit();
            return id_procedimiento;

        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    async findAll() {
        const [rows] = await db.execute(
            `SELECT c.*, p.precio
             FROM catalogo_procedimientos c
             LEFT JOIN precios_procedimientos p
             ON c.id_catalogo_procedimiento = p.id_catalogo_procedimiento
             ORDER BY c.nombre ASC`
        );
        return rows;
    },

    async findById(id) {
        const [rows] = await db.execute(
            `SELECT c.*, p.precio
             FROM catalogo_procedimientos c
             LEFT JOIN precios_procedimientos p
             ON c.id_catalogo_procedimiento = p.id_catalogo_procedimiento
             WHERE c.id_catalogo_procedimiento = ?`,
            [id]
        );
        return rows[0];
    },
    async findByIdClinica(id_clinica) {
        const [rows] = await db.execute(
            `SELECT c.*, p.precio
         FROM catalogo_procedimientos c
         LEFT JOIN precios_procedimientos p
         ON c.id_catalogo_procedimiento = p.id_catalogo_procedimiento
         WHERE c.id_clinica = ?`,
            [id_clinica]
        );
        return rows; // <-- devuelve todo el arreglo
    },

    async update(id, data) {
        const conn = await db.getConnection();
        try {
            await conn.beginTransaction();

            const [result] = await conn.execute(
                `UPDATE catalogo_procedimientos
                 SET id_clinica = ?, nombre = ?, descripcion = ?, activo = ?
                 WHERE id_catalogo_procedimiento = ?`,
                [
                    data.id_clinica,
                    data.nombre,
                    data.descripcion ?? null,
                    data.activo ?? 1,
                    id
                ]
            );

            if (data.precio != null) {
                const [existing] = await conn.execute(
                    `SELECT id_precio FROM precios_procedimientos WHERE id_catalogo_procedimiento = ?`,
                    [id]
                );

                if (existing.length) {
                    await conn.execute(
                        `UPDATE precios_procedimientos SET precio = ? WHERE id_catalogo_procedimiento = ?`,
                        [data.precio, id]
                    );
                } else {
                    await conn.execute(
                        `INSERT INTO precios_procedimientos (id_catalogo_procedimiento, precio)
                         VALUES (?, ?)`,
                        [id, data.precio]
                    );
                }
            }

            await conn.commit();
            return result.affectedRows;

        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    async delete(id) {
        const conn = await db.getConnection();
        try {
            await conn.beginTransaction();

            await conn.execute(
                `DELETE FROM precios_procedimientos WHERE id_catalogo_procedimiento = ?`,
                [id]
            );

            const [result] = await conn.execute(
                `DELETE FROM catalogo_procedimientos WHERE id_catalogo_procedimiento = ?`,
                [id]
            );

            await conn.commit();
            return result.affectedRows;

        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    }

};

module.exports = CatalogoProcedimientos;

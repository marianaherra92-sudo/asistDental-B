const db = require('../../config/db');

const Tratamiento = {

    async create(data) {
        const conn = await db.getConnection();
        try {
            await conn.beginTransaction();

            const [result] = await conn.execute(
                `INSERT INTO plan_tratamiento (
                    id_clinica, id_paciente, id_dentista, nombre_plan, fecha_inicio, 
                    fecha_fin_estimada, costo_total_inicial, costo_ajustado, razon_ajuste, 
                    plan_pago, estado
                ) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
                [
                    data.id_clinica,
                    data.id_paciente,
                    data.id_dentista,
                    data.nombre_plan ?? null,
                    data.fecha_inicio ?? null,
                    data.fecha_fin_estimada ?? null,
                    data.costo_total_inicial ?? 0,
                    data.costo_ajustado ?? 0,
                    data.razon_ajuste ?? null,
                    data.plan_pago ?? 'Pago único',
                    data.estado ?? 'En Progreso'
                ]
            );

            const id_plan = result.insertId;

            if (data.procedimientos?.length) {
                const procedimientos = data.procedimientos.map(p => [
                    id_plan,
                    data.id_clinica,
                    data.id_paciente,
                    p.id_catalogo_procedimiento,
                    p.status ?? 'Pendiente',
                    p.cantidad ?? 1,
                    p.precio_unitario ?? 0
                ]);

                await conn.query(
                    `INSERT INTO plan_tratamiento_procedimientos 
                    (id_plan, id_clinica, id_paciente, id_catalogo_procedimiento, status, cantidad, precio_unitario)
                    VALUES ?`,
                    [procedimientos]
                );
            }

            await conn.commit();
            return id_plan;

        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    async findById(id_plan) {
        const [rows] = await db.execute(
            `SELECT * FROM plan_tratamiento WHERE id_plan = ?`,
            [id_plan]
        );
        return rows[0];
    },

    async findByPaciente(id_paciente) {
        const [rows] = await db.execute(
            `
      SELECT *
      FROM plan_tratamiento
      WHERE id_paciente = ?
      ORDER BY fecha_inicio DESC
      `,
            [id_paciente]
        );
        return rows;
    },

    async update(id_plan, data) {
        const [result] = await db.execute(
            `
      UPDATE plan_tratamiento
      SET
        nombre_plan = ?,
        fecha_inicio = ?,
        fecha_fin_estimada = ?,
        costo_total_inicial = ?,
        costo_ajustado = ?,
        razon_ajuste = ?,
        plan_pago = ?,
        estado = ?
      WHERE id_plan = ?
      `,
            [
                data.nombre_plan ?? null,
                data.fecha_inicio ?? null,
                data.fecha_fin_estimada ?? null,
                data.costo_total_inicial ?? 0,
                data.costo_ajustado ?? 0,
                data.razon_ajuste ?? null,
                data.plan_pago ?? 'Pago único',
                data.estado ?? 'En Progreso',
                id_plan
            ]
        );

        return result.affectedRows;
    },

    async delete(id_plan) {
        const [result] = await db.execute(
            `DELETE FROM plan_tratamiento WHERE id_plan = ?`,
            [id_plan]
        );
        return result.affectedRows;
    }

};

module.exports = Tratamiento;

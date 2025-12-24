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

        const [planRows] = await db.execute(
            `SELECT * FROM plan_tratamiento WHERE id_plan = ?`,
            [id_plan]
        );

        if (!planRows.length) return null;

        const plan = planRows[0];

        const [procRows] = await db.execute(
            `
            SELECT 
                ptp.id_plan,
                ptp.id_catalogo_procedimiento,
                cp.nombre,
                cp.descripcion,
                ptp.status,
                ptp.cantidad,
                ptp.precio_unitario,
                pp.precio AS precio_base
            FROM plan_tratamiento_procedimientos ptp
            INNER JOIN catalogo_procedimientos cp
                ON ptp.id_catalogo_procedimiento = cp.id_catalogo_procedimiento
            LEFT JOIN precios_procedimientos pp
                ON cp.id_catalogo_procedimiento = pp.id_catalogo_procedimiento
            WHERE ptp.id_plan = ?
            `,
            [id_plan]
        );

        plan.procedimientos = procRows;

        return plan;
    },

    async findByPaciente(id_paciente) {

        const [plans] = await db.execute(
            `
            SELECT *
            FROM plan_tratamiento
            WHERE id_paciente = ?
            ORDER BY fecha_inicio DESC
            `,
            [id_paciente]
        );

        if (!plans.length) return [];

        const ids = plans.map(p => p.id_plan);

        const [procedimientos] = await db.query(
            `
            SELECT 
                ptp.id_plan,
                ptp.id_catalogo_procedimiento,
                cp.nombre,
                cp.descripcion,
                ptp.status,
                ptp.cantidad,
                ptp.precio_unitario,
                pp.precio AS precio_base
            FROM plan_tratamiento_procedimientos ptp
            INNER JOIN catalogo_procedimientos cp
                ON ptp.id_catalogo_procedimiento = cp.id_catalogo_procedimiento
            LEFT JOIN precios_procedimientos pp
                ON cp.id_catalogo_procedimiento = pp.id_catalogo_procedimiento
            WHERE ptp.id_plan IN (?)
            `,
            [ids]
        );

        return plans.map(plan => ({
            ...plan,
            procedimientos: procedimientos.filter(p => p.id_plan === plan.id_plan)
        }));
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

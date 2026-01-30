const db = require('../../../config/db');

const OdontogramaProcedimiento = {
    async add(data, connection = db) {
        const {
            id_odontograma,
            id_dentista,
            id_plan,
            id_plan_tratamiento_procedimiento,
            id_diagnostico,
            descripcion
        } = data;

        const [result] = await connection.query(
            `INSERT INTO odontograma_procedimientos
             (id_odontograma, id_dentista, id_plan, id_plan_tratamiento_procedimiento, id_diagnostico, descripcion)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [
                id_odontograma,
                id_dentista,
                id_plan,
                id_plan_tratamiento_procedimiento,
                id_diagnostico,
                descripcion
            ]
        );

        return result.insertId; // ← id_odontograma_procedimiento
    },

    async findByOdontograma(id_odontograma) {
        const [rows] = await db.query(`
        SELECT 
            op.id_odontograma_procedimiento,
            op.id_odontograma,
            op.descripcion,
            op.fecha_realizacion,
            op.id_diagnostico,

            -- Catálogo de procedimientos
            cp.id_catalogo_procedimiento,
            cp.nombre AS procedimiento_nombre,
            cp.descripcion AS procedimiento_descripcion,

            -- Procedimiento dentro del plan
            ptp.id_procedimiento AS id_plan_tratamiento_procedimiento,
            ptp.status AS procedimiento_status,
            ptp.cantidad AS procedimiento_cantidad,
            ptp.precio_unitario AS procedimiento_precio_unitario,

            -- Dentista
            d.id_dentista,
            CONCAT(d.nombre, ' ', d.apellido_paterno, ' ', IFNULL(d.apellido_materno, '')) AS dentista_nombre,

            -- Plan de tratamiento
            pt.id_plan,
            pt.nombre_plan AS plan_tratamiento_nombre

        FROM odontograma_procedimientos op
        INNER JOIN plan_tratamiento_procedimientos ptp
            ON ptp.id_procedimiento = op.id_plan_tratamiento_procedimiento
        INNER JOIN catalogo_procedimientos cp
            ON cp.id_catalogo_procedimiento = ptp.id_catalogo_procedimiento
        INNER JOIN dentistas d
            ON d.id_dentista = op.id_dentista
        INNER JOIN plan_tratamiento pt
            ON pt.id_plan = op.id_plan
        WHERE op.id_odontograma = ?
    `, [id_odontograma]);

        return rows;
    }

};

module.exports = OdontogramaProcedimiento;

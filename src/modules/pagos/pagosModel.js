const db = require('../../config/db');

const PagosModel = {

    create: async (data, connection = db) => {
        const {
            id_cuota,
            id_paciente,
            id_plan,
            id_clinica,
            monto,
            metodo_pago,
            fecha_pago,
            referencia,
            nota,
        } = data;

        const [result] = await connection.query(
            `
      INSERT INTO pagos (
        id_cuota,
        id_paciente,
        id_plan,
        id_clinica,
        monto,
        metodo_pago,
        fecha_pago,
        referencia,
        nota
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)
      `,
            [
                id_cuota || null,
                id_paciente,
                id_plan,
                id_clinica,
                monto,
                metodo_pago,
                fecha_pago || new Date(),
                referencia || null,
                nota || null,
            ]
        );

        return result.insertId;
    },

    getAll: async () => {
        const [rows] = await db.query(`
      SELECT p.*, 
             c.monto AS monto_cuota, 
             pt.nombre_plan, 
             pa.nombre, pa.apellido_paterno, pa.apellido_materno
      FROM pagos p
      LEFT JOIN cuotas_tratamiento c ON p.id_cuota = c.id_cuota
      LEFT JOIN plan_tratamiento pt ON p.id_plan = pt.id_plan
      LEFT JOIN pacientes pa ON p.id_paciente = pa.id_paciente
    `);
        return rows;
    },

    getById: async (id) => {
        const [rows] = await db.query(
            `SELECT * FROM pagos WHERE id_pago = ?`,
            [id]
        );
        return rows[0];
    },

    getByPacienteId: async (id_paciente) => {
        const [rows] = await db.query(`
      SELECT p.*, 
             c.monto AS monto_cuota, 
             pt.nombre_plan
      FROM pagos p
      LEFT JOIN cuotas_tratamiento c ON p.id_cuota = c.id_cuota
      LEFT JOIN plan_tratamiento pt ON p.id_plan = pt.id_plan
      WHERE p.id_paciente = ?
      ORDER BY p.fecha_pago DESC
    `, [id_paciente]);
        return rows;
    },

    getCuotasPendientes: async (id_paciente) => {
        const [rows] = await db.query(`
      SELECT c.id_cuota, c.id_plan, c.monto, c.fecha_programada, c.pagada, pt.nombre_plan, 'Cuota' AS tipo
      FROM cuotas_tratamiento c
      JOIN plan_tratamiento pt ON c.id_plan = pt.id_plan
      WHERE c.id_paciente = ? AND c.pagada = 0
    `, [id_paciente]);
        return rows;
    },


    getPagosUnicosPendientes: async (id_paciente) => {
        const [rows] = await db.query(`
      SELECT pt.id_plan, pt.nombre_plan, pt.costo_total_inicial AS monto, 'Pago único' AS tipo
      FROM plan_tratamiento pt
      LEFT JOIN pagos p 
        ON pt.id_plan = p.id_plan AND p.id_cuota IS NULL
      WHERE pt.id_paciente = ? AND pt.plan_pago = 'Pago único'
      GROUP BY pt.id_plan, pt.nombre_plan, pt.costo_total_inicial
      HAVING COUNT(p.id_pago) = 0
    `, [id_paciente]);
        return rows;
    },

    getPagosRegistrados: async (id_paciente) => {
        const [rows] = await db.query(`
      SELECT p.id_pago, p.id_cuota, p.id_plan, p.monto, p.fecha_pago, p.metodo_pago,
             COALESCE(c.id_cuota, 0) AS cuota,
             pt.nombre_plan,
             CASE WHEN c.id_cuota IS NULL THEN 'Pago único' ELSE 'Cuota' END AS tipo
      FROM pagos p
      LEFT JOIN cuotas_tratamiento c ON p.id_cuota = c.id_cuota
      LEFT JOIN plan_tratamiento pt ON p.id_plan = pt.id_plan
      WHERE p.id_paciente = ?
    `, [id_paciente]);
        return rows;
    },

    getPagosRegistradosPorClinica: async (id_clinica) => {
        const [rows] = await db.query(`
    SELECT 
      p.id_pago AS id,
      p.id_plan,
      pt.nombre_plan,
      p.id_paciente,
      CONCAT(pa.nombre, ' ', pa.apellido_paterno, ' ', pa.apellido_materno) AS paciente,
      p.monto,
      p.referencia,
      DATE(p.fecha_pago) AS fecha,
      p.metodo_pago,
      CASE 
        WHEN p.id_cuota IS NULL THEN 'Pago único'
        ELSE 'Cuota'
      END AS tipo
    FROM pagos p
    JOIN plan_tratamiento pt ON p.id_plan = pt.id_plan
    JOIN pacientes pa ON p.id_paciente = pa.id_paciente
    WHERE p.id_clinica = ?
    ORDER BY p.fecha_pago DESC
  `, [id_clinica]);

        return rows;
    },

    getCuotasPendientesPorClinica: async (id_clinica) => {
        const [rows] = await db.query(`
        SELECT 
          c.id_cuota AS id,
          c.id_plan,
          pt.nombre_plan,
          c.id_paciente,
          CONCAT(pa.nombre, ' ', pa.apellido_paterno, ' ', pa.apellido_materno) AS paciente,
          c.monto,
          c.fecha_programada AS fecha,
          'Cuota' AS tipo
        FROM cuotas_tratamiento c
        JOIN plan_tratamiento pt ON c.id_plan = pt.id_plan
        JOIN pacientes pa ON c.id_paciente = pa.id_paciente
        WHERE pt.id_clinica = ?
          AND c.pagada = 0
      `, [id_clinica]);

            return rows;
    },

    getPagosUnicosPendientesPorClinica: async (id_clinica) => {
        const [rows] = await db.query(`
        SELECT 
          pt.id_plan AS id,
          pt.id_plan,
          pt.nombre_plan,
          pt.id_paciente,
          CONCAT(pa.nombre, ' ', pa.apellido_paterno, ' ', pa.apellido_materno) AS paciente,
          pt.costo_total_inicial AS monto,
          pt.fecha_inicio AS fecha,
          'Pago único' AS tipo
        FROM plan_tratamiento pt
        JOIN pacientes pa ON pt.id_paciente = pa.id_paciente
        LEFT JOIN pagos p 
          ON pt.id_plan = p.id_plan 
          AND p.id_cuota IS NULL
        WHERE pt.id_clinica = ?
          AND pt.plan_pago = 'Pago único'
        GROUP BY pt.id_plan
        HAVING COUNT(p.id_pago) = 0
      `, [id_clinica]);

            return rows;
        },

    update: async (id, data) => {
        await db.query(
            `UPDATE pagos SET ? WHERE id_pago = ?`,
            [data, id]
        );
        return PagosModel.getById(id);
    },

    delete: async (id) => {
        const [result] = await db.query(
            `DELETE FROM pagos WHERE id_pago = ?`,
            [id]
        );
        return result.affectedRows;
    }

};

module.exports = PagosModel;

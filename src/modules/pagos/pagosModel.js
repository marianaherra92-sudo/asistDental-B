const db = require('../../config/db');

const PagosModel = {

    create: async (data, connection = db) => {
        const {
            id_cuota,
            id_paciente,
            id_plan,
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
        monto,
        metodo_pago,
        fecha_pago,
        referencia,
        nota
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
            [
                id_cuota || null,
                id_paciente,
                id_plan,
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

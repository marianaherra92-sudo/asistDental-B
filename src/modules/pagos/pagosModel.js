const db = require('../../config/db');

const PagosModel = {
  async create(pago) {
    const {
      id_cuota,
      id_paciente,
      id_plan,
      monto,
      metodo_pago,
      fecha_pago,
      referencia,
      nota,
    } = pago;

    const [result] = await db.query(
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
        fecha_pago,
        referencia,
        nota,
      ]
    );

    return result.insertId;
  },

  async findByPaciente(id_paciente) {
    const [rows] = await db.query(
      `
      SELECT *
      FROM pagos
      WHERE id_paciente = ?
      ORDER BY fecha_pago DESC
      `,
      [id_paciente]
    );
    return rows;
  },

  async findByTratamiento(id_plan) {
    const [rows] = await db.query(
      `
      SELECT *
      FROM pagos
      WHERE id_plan = ?
      ORDER BY fecha_pago DESC
      `,
      [id_plan]
    );
    return rows;
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
        const [rows] = await db.query(`SELECT * FROM pagos WHERE id_pago = ?`, [id]);
        return rows[0];
    },

    getByPacienteId: async (id_paciente) => {
        const [rows] = await db.query(`
    SELECT p.*, 
           c.monto AS monto_cuota, 
           pt.nombre_plan, 
           pa.nombre, pa.apellido_paterno, pa.apellido_materno
    FROM pagos p
    LEFT JOIN cuotas_tratamiento c ON p.id_cuota = c.id_cuota
    LEFT JOIN plan_tratamiento pt ON p.id_plan = pt.id_plan
    LEFT JOIN pacientes pa ON p.id_paciente = pa.id_paciente
    WHERE p.id_paciente = ?
  `, [id_paciente]);
        return rows;
    },

    create: async (data) => {
        const { id_cuota, id_paciente, id_plan, monto, metodo_pago, referencia, nota } = data;
        const [result] = await db.query(
            `INSERT INTO pagos (id_cuota, id_paciente, id_plan, monto, metodo_pago, referencia, nota)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [id_cuota || null, id_paciente, id_plan || null, monto, metodo_pago || 'Efectivo', referencia || null, nota || null]
        );
        return PagosModel.getById(result.insertId);
    },

    update: async (id, data) => {
        const { id_cuota, id_paciente, id_plan, monto, metodo_pago, referencia, nota } = data;
        await db.query(
            `UPDATE pagos SET id_cuota = ?, id_paciente = ?, id_plan = ?, monto = ?, metodo_pago = ?, referencia = ?, nota = ? 
       WHERE id_pago = ?`,
            [id_cuota || null, id_paciente, id_plan || null, monto, metodo_pago || 'Efectivo', referencia || null, nota || null, id]
        );
        return PagosModel.getById(id);
    },

    delete: async (id) => {
        const [result] = await db.query(`DELETE FROM pagos WHERE id_pago = ?`, [id]);
        return result.affectedRows;
    }
};

module.exports = PagosModel;

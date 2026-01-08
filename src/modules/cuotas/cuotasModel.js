const db = require("../../config/db");

const CuotasTratamientoModel = {
  async createMany(cuotas) {
    const values = cuotas.map((c) => [
      c.id_plan,
      c.monto,
      c.fecha_programada,
      false,
    ]);

    await db.query(
      `
      INSERT INTO cuotas_tratamiento
      (id_plan, monto, fecha_programada, pagada)
      VALUES ?
      `,
      [values]
    );
  },

  async findByTratamiento(id_plan) {
    const [rows] = await db.query(
      `
      SELECT id_cuota, monto, fecha_programada, pagada
      FROM cuotas_tratamiento
      WHERE id_plan = ?
      ORDER BY fecha_programada
      `,
      [id_plan]
    );
    return rows;
  },

  async marcarComoPagada(id_cuota, connection = db) {
    await connection.query(
      `
      UPDATE cuotas_tratamiento
      SET pagada = TRUE
      WHERE id_cuota = ?
      `,
      [id_cuota]
    );
  },
};

module.exports = CuotasTratamientoModel;
const db = require('../../config/db');

const CuotasModel = {
    getAll: async () => {
        const [rows] = await db.query(`
      SELECT c.*, pt.nombre_plan, pa.nombre AS nombre_paciente, pa.apellido_paterno, pa.apellido_materno
      FROM cuotas_tratamiento c
      LEFT JOIN plan_tratamiento pt ON c.id_plan = pt.id_plan
      LEFT JOIN pacientes pa ON c.id_paciente = pa.id_paciente
    `);
        return rows;
    },

    getById: async (id_cuota) => {
        const [rows] = await db.query(`SELECT * FROM cuotas_tratamiento WHERE id_cuota = ?`, [id_cuota]);
        return rows[0];
    },

    getByPlanId: async (id_plan) => {
        const [rows] = await db.query(`SELECT * FROM cuotas_tratamiento WHERE id_plan = ?`, [id_plan]);
        return rows;
    },

    getByPacienteId: async (id_paciente) => {
        const [rows] = await db.query(`
      SELECT c.*, pt.nombre_plan
      FROM cuotas_tratamiento c
      LEFT JOIN plan_tratamiento pt ON c.id_plan = pt.id_plan
      WHERE c.id_paciente = ?
    `, [id_paciente]);
        return rows;
    },

    create: async (data) => {
        const { id_plan, id_paciente, monto, fecha_programada, pagada } = data;
        const [result] = await db.query(
            `INSERT INTO cuotas_tratamiento (id_plan, id_paciente, monto, fecha_programada, pagada) VALUES (?, ?, ?, ?, ?)`,
            [id_plan, id_paciente, monto, fecha_programada, pagada || 0]
        );
        return CuotasModel.getById(result.insertId);
    },

    update: async (id_cuota, data) => {
        const { id_plan, id_paciente, monto, fecha_programada, pagada } = data;
        await db.query(
            `UPDATE cuotas_tratamiento 
       SET id_plan = ?, id_paciente = ?, monto = ?, fecha_programada = ?, pagada = ? 
       WHERE id_cuota = ?`,
            [id_plan, id_paciente, monto, fecha_programada, pagada || 0, id_cuota]
        );
        return CuotasModel.getById(id_cuota);
    },

    delete: async (id_cuota) => {
        const [result] = await db.query(`DELETE FROM cuotas_tratamiento WHERE id_cuota = ?`, [id_cuota]);
        return result.affectedRows;
    }
};

module.exports = CuotasModel;

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
};

module.exports = PagosModel;

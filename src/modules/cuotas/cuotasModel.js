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

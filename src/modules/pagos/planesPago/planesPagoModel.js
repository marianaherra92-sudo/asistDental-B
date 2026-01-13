const db = require("../../../config/db");

const PlanesPagoModel = {
  async findByClinica(id_clinica) {
    const [rows] = await db.query(
      `
      SELECT
        pt.id_plan,
        pt.nombre_plan,
        pt.fecha_inicio,
        pt.costo_ajustado,
        pt.estado,
        pt.plan_pago,
        pt.id_paciente,
        CONCAT(
          p.nombre, ' ',
          p.apellido_paterno, ' ',
          p.apellido_materno
        ) AS paciente,
        p.telefono,
        p.correo,
        ct.id_cuota,
        ct.monto,
        ct.fecha_programada,
        ct.pagada
      FROM plan_tratamiento pt
      JOIN pacientes p 
        ON p.id_paciente = pt.id_paciente
      LEFT JOIN cuotas_tratamiento ct 
        ON ct.id_plan = pt.id_plan
      WHERE pt.id_clinica = ?
      ORDER BY 
        pt.fecha_inicio DESC, 
        ct.fecha_programada ASC
      `,
      [id_clinica]
    );

    return rows;
  },
};

module.exports = PlanesPagoModel;

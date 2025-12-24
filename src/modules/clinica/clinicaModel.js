const db = require('../../config/db');

const Clinica = {
  async create(data) {
    const [result] = await db.execute(
      `INSERT INTO clinicas (nombre, subdominio, direccion, telefono, correo_contacto, plan_saas, limite_pacientes, activo) VALUES (?, ?, ?, ?, ?, ?, ?, true)`,
      [
        data.nombre,
        data.subdominio,
        data.direccion,
        data.telefono,
        data.correo_contacto,
        data.plan_saas,
        data.limite_pacientes
      ]
    );
    return result.insertId;
  },
};
module.exports = Clinica;

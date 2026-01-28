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
  
  async update(idClinica, data) {
    await db.execute(
      `
      UPDATE clinicas SET
        nombre = ?,
        direccion = ?,
        telefono = ?,
        correo_contacto = ?,
        color_principal = ?,
        color_secundario = ?,
        color_extra = ?
      WHERE id_clinica = ?
      `,
      [
        data.nombre,
        data.direccion,
        data.telefono,
        data.correo_contacto,
        data.color_principal,
        data.color_secundario,
        data.color_extra,
        idClinica
      ]
    );
  },
};
module.exports = Clinica;

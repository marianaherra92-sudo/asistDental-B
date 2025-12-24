const db = require('../../config/db');

const Dentista = {
  async create(data) {
    const [result] = await db.execute(
      `INSERT INTO dentistas (id_clinica, nombre, apellido_paterno, apellido_materno, telefono, correo, especialidad, activo) VALUES (?, ?, ?, ?, ?, ?, ?, true)`,
      [
        data.id_clinica,
        data.nombre,
        data.apellido_paterno,
        data.apellido_materno,
        data.telefono,
        data.correo,
        data.especialidad
      ]
    );
    return result.insertId;
  },
  async findById(id_dentista) {
    const [rows] = await db.execute(
      'SELECT * FROM dentistas WHERE id_dentista = ?',
      [id_dentista]
    );
    return rows[0];
  },
};
module.exports = Dentista;

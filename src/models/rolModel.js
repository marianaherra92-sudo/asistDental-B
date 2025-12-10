const db = require('../config/db');

const Rol = {
  async create(data) {
    const [result] = await db.execute(
      `INSERT INTO roles (id_clinica, nombre_rol, descripcion)
       VALUES (?, ?, ?)`,
      [data.id_clinica, data.nombre_rol, data.descripcion]
    );
    return result.insertId;
  }
};

module.exports = Rol;

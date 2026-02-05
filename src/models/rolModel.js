const db = require('../config/db');

const Rol = {
  async getAllForClinica(id_clinica) {
    const [rows] = await db.execute(
      `SELECT id_rol, nombre_rol, descripcion 
       FROM roles 
       WHERE id_clinica = ?`,
      [id_clinica]
    );
    console.log("Roles desde DB:", rows);
    return rows;
  },
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

const db = require('../config/db');

const Usuario = {
  async create(data) {
    const [result] = await db.execute(
      `INSERT INTO usuarios_login (id_clinica, id_dentista, usuario, password_hash, id_rol, activo)
       VALUES (?, ?, ?, ?, ?, true)`,
      [
        data.id_clinica,
        data.id_dentista,
        data.usuario,
        data.password_hash,
        data.id_rol
      ]
    );
    return result.insertId;
  },

    async findByUsuarioWithRol(usuario) {
        const [rows] = await db.execute(
            `
    SELECT u.*, r.nombre_rol
    FROM usuarios_login u
    LEFT JOIN roles r ON r.id_rol = u.id_rol
    WHERE u.usuario = ? AND u.activo = TRUE
    `,
            [usuario]
        );
        return rows[0];
    }
};

module.exports = Usuario;

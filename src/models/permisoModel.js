const db = require('../config/db');

const Permiso = {
    async getAllForClinica() {
      const [rows] = await db.execute(
        `SELECT * FROM permisos WHERE nombre != 'gestionar_saas'`
      );
      return rows;
    },

    async getPermisosByRol(id_rol) {
        const [rows] = await db.execute(
            `
    SELECT p.nombre
    FROM rol_permiso rp
    INNER JOIN permisos p ON p.id_permiso = rp.id_permiso
    WHERE rp.id_rol = ?
    `,
            [id_rol]
        );
        return rows.map(r => r.nombre);
    }

};
  
  module.exports = Permiso;
  
const db = require('../config/db');

const RolPermiso = {
    async assign(id_rol, id_permiso) {
      await db.execute(
        `INSERT INTO rol_permiso (id_rol, id_permiso)
         VALUES (?, ?)`,
        [id_rol, id_permiso]
      );
    }
  };
  
  module.exports = RolPermiso;
  
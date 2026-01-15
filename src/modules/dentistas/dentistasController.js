const db = require('../../config/db');

const DentistaController = {
  async getAllByClinica(req, res) {
    try {
      res.set('Cache-Control', 'no-store');

      const { id_clinica } = req.params;

      const [rows] = await db.execute(
        `
        SELECT 
          id_dentista,
          CONCAT(nombre, ' ', apellido_paterno, ' ', apellido_materno) AS nombre,
          telefono,
          correo,
          especialidad,
          fecha_registro,
          CASE 
            WHEN activo = 1 THEN 'Activo'
            ELSE 'Inactivo'
          END AS status
        FROM dentistas
        WHERE id_clinica = ?
        `,
        [id_clinica]
      );

      res.status(200).json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  }
};

module.exports = DentistaController;

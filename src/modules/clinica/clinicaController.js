const db = require('../../config/db');

const Clinica = require('./clinicaModel');

const ClinicaController = {
  async getById(req, res) {
    const { id } = req.params;

    try {
      const [rows] = await db.execute(
        `
        SELECT 
          id_clinica,
          nombre,
          subdominio,
          direccion,
          telefono,
          correo_contacto AS correo,
          plan_saas AS plan,
          logo_url,
          color_principal,
          color_secundario,
          color_extra
        FROM clinicas
        WHERE id_clinica = ?
        `,
        [id]
      );

      if (rows.length === 0) {
        return res.status(404).json({ message: 'No encontrada' });
      }

      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ message: 'Error en el servidor' });
    }
  },

  async update(req, res) {
    const { id } = req.params;

    try {
      await Clinica.update(id, req.body);
      res.json({ message: 'Clínica actualizada correctamente' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al actualizar la clínica' });
    }
  }
};

module.exports = ClinicaController;

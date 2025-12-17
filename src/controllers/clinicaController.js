const db = require('../config/db');

const ClinicaController = {
  async getById(req, res) {
    const { id } = req.params;
    try {
      const [rows] = await db.execute(
        'SELECT id_clinica, nombre FROM clinicas WHERE id_clinica = ?',
        [id]
      );
      if (rows.length === 0) return res.status(404).json({ message: 'No encontrada' });
      res.json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  }
};

module.exports = ClinicaController;

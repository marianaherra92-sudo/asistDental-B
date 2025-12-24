const db = require('../../config/db');

const DentistaController = {
  async getAllByClinica(req, res) {
    try {
      const { id_clinica } = req.params;
      const [rows] = await db.execute(
        'SELECT * FROM dentistas WHERE id_clinica = ? AND activo = 1',
        [id_clinica]
      );
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  }
};

module.exports = DentistaController;


const ConfiguracionClinica = require('./configuracionClinicaModel');

const ConfiguracionClinicaController = {
  async getByClinica(req, res) {
  const { id } = req.params;

  try {
    res.set('Cache-Control', 'no-store'); 
    const config = await ConfiguracionClinica.getByClinica(id);
    
    if (!config) {
      return res.status(200).json(null);
    }

    res.status(200).json(config);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
},

async updateByClinica(req, res) {
    const { id } = req.params;
    const data = req.body;

    try {
      await ConfiguracionClinica.updateByClinica(id, data);
      res.json({ message: 'Configuración actualizada correctamente' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  }
};

module.exports = ConfiguracionClinicaController;

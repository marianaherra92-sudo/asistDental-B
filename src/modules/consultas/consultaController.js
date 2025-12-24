const Consulta = require('./consultaModel');

exports.createConsulta = async (req, res) => {
  try {
    const id_consulta = await Consulta.create(req.body);
    res.status(201).json({ mensaje: 'Consulta registrada', id_consulta });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error interno al crear consulta' });
  }
};

exports.getConsulta = async (req, res) => {
  try {
    const { id_consulta } = req.params;
    const consulta = await Consulta.findById(id_consulta);
    if (!consulta) {
      return res.status(404).json({ mensaje: 'Consulta no encontrada' });
    }
    res.json(consulta);
  } catch {
    res.status(500).json({ mensaje: 'Error interno' });
  }
};

exports.getConsultasPaciente = async (req, res) => {
  try {
    const { id_paciente } = req.params;
    const consultas = await Consulta.findByPaciente(id_paciente);
    res.json(consultas);
  } catch {
    res.status(500).json({ mensaje: 'Error interno' });
  }
};

exports.updateConsulta = async (req, res) => {
  try {
    const { id_consulta } = req.params;
    const result = await Consulta.update(id_consulta, req.body);
    if (!result) return res.status(404).json({ mensaje: 'Consulta no encontrada' });
    res.json({ mensaje: 'Actualizado correctamente' });
  } catch {
    res.status(500).json({ mensaje: 'Error interno' });
  }
};

exports.deleteConsulta = async (req, res) => {
  try {
    const { id_consulta } = req.params;
    const result = await Consulta.delete(id_consulta);
    if (!result) return res.status(404).json({ mensaje: 'Consulta no encontrada' });
    res.json({ mensaje: 'Consulta eliminada' });
  } catch {
    res.status(500).json({ mensaje: 'Error interno' });
  }
};


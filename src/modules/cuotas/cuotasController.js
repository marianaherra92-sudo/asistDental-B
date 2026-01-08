const CuotasModel = require("./cuotasModel");

const CuotasTratamientoController = {
  async crearCuotas(req, res) {
    const { id_plan, cuotas } = req.body;

    if (!id_plan || !Array.isArray(cuotas)) {
      return res.status(400).json({ message: "Datos inválidos" });
    }

    const cuotasData = cuotas.map((c) => ({
      id_plan,
      monto: c.monto,
      fecha_programada: c.fecha_programada,
    }));

    await CuotasModel.createMany(cuotasData);

    res.status(201).json({ message: "Cuotas creadas correctamente" });
  },

  async listarPorTratamiento(req, res) {
    const { id } = req.params;
    const cuotas = await CuotasModel.findByTratamiento(id);
    res.json(cuotas);
  },
};

module.exports = CuotasTratamientoController;
const CuotasService = require('./cuotasService');

const CuotasController = {
    getCuotas: async (req, res) => {
        try {
            const cuotas = await CuotasService.getCuotas();
            res.json(cuotas);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getCuotaById: async (req, res) => {
        try {
            const cuota = await CuotasService.getCuotaById(req.params.id_cuota);
            res.json(cuota);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    },

    getCuotasByPlan: async (req, res) => {
        try {
            const cuotas = await CuotasService.getCuotasByPlan(req.params.id_plan);
            res.json(cuotas);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    },

    getCuotasByPaciente: async (req, res) => {
        try {
            const cuotas = await CuotasService.getCuotasByPaciente(req.params.id_paciente);
            res.json(cuotas);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    },

    createCuota: async (req, res) => {
        try {
            const cuota = await CuotasService.createCuota(req.body);
            res.status(201).json(cuota);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    updateCuota: async (req, res) => {
        try {
            const cuota = await CuotasService.updateCuota(req.params.id_cuota, req.body);
            res.json(cuota);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    },

    deleteCuota: async (req, res) => {
        try {
            await CuotasService.deleteCuota(req.params.id_cuota);
            res.json({ message: 'Cuota eliminada correctamente' });
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    }
};

module.exports = CuotasController;

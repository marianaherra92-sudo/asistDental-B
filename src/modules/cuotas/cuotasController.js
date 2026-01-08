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

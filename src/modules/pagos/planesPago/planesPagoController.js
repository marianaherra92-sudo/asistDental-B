const PlanesPagoModel = require("./planesPagoModel");

const PlanesPagoController = {
  async listarPorClinica(req, res) {
    const { id } = req.params;

    try {
      const rows = await PlanesPagoModel.findByClinica(id);

      const planes = Object.values(
        rows.reduce((acc, row) => {
          if (!acc[row.id_plan]) {
            acc[row.id_plan] = {
              id: row.id_plan,
              fecha: row.fecha_inicio,
              paciente: row.paciente,
              telefono: row.telefono,
              email: row.email,
              tratamiento: row.nombre_plan,
              total: row.costo_ajustado,
              estado: row.estado,
              plan_pago: row.plan_pago,
              cuotas: [],
            };
          }

          if (row.id_cuota) {
            acc[row.id_plan].cuotas.push({
              id: row.id_cuota,
              monto: row.monto,
              fecha: row.fecha_programada,
              estado: row.pagada ? "Pagado" : "Pendiente",
            });
          }

          return acc;
        }, {})
      );

      res.json(planes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener planes de pago" });
    }
  },
};

module.exports = PlanesPagoController;

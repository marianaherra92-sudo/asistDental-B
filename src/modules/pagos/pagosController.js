const db = require("../../config/db");
const PagosModel = require("./pagosModel");
const CuotasModel = require("../cuotas/cuotasModel");

const PagosController = {
  async registrarPago(req, res) {
    const {
      id_cuota,
      id_paciente,
      id_plan,
      monto,
      metodo_pago,
      fecha_pago,
      referencia,
      nota,
    } = req.body;

    if (!id_paciente || !id_plan || !monto || !metodo_pago) {
      return res.status(400).json({ message: "Datos incompletos" });
    }

    const connection = await db.getConnection();

    try {
      await connection.beginTransaction();
      
      const pagoId = await PagosModel.create({
        id_cuota,
        id_paciente,
        id_plan,
        monto,
        metodo_pago,
        fecha_pago,
        referencia,
        nota,
      });

      if (id_cuota) {
        await CuotasModel.marcarComoPagada(id_cuota, connection);
      }

      await connection.commit();

      res.status(201).json({
        message: "Pago registrado correctamente",
        id_pago: pagoId,
      });
    } catch (error) {
      await connection.rollback();
      console.error(error);
      res.status(500).json({ message: "Error al registrar el pago" });
    } finally {
      connection.release();
    }
  },

  async listarPorPaciente(req, res) {
    const { id } = req.params;
    const pagos = await PagosModel.findByPaciente(id);
    res.json(pagos);
  },
};

module.exports = PagosController;

const PagosModel = require('./pagosModel');

const PagosService = {
    getPagos: async () => {
        return await PagosModel.getAll();
    },

    getPagoById: async (id) => {
        const pago = await PagosModel.getById(id);
        if (!pago) throw new Error('Pago no encontrado');
        return pago;
    },

    getPagosByPaciente: async (id_paciente) => {
        const pagos = await PagosModel.getByPacienteId(id_paciente);
        if (!pagos.length) throw new Error('No se encontraron pagos para este paciente');
        return pagos;
    },

    createPago: async (data) => {
        if (!data.id_paciente) throw new Error('El id_paciente es obligatorio');
        if (!data.monto) throw new Error('El monto es obligatorio');
        return await PagosModel.create(data);
    },

    updatePago: async (id, data) => {
        const pago = await PagosModel.getById(id);
        if (!pago) throw new Error('Pago no encontrado');
        return await PagosModel.update(id, data);
    },

    deletePago: async (id) => {
        const affectedRows = await PagosModel.delete(id);
        if (!affectedRows) throw new Error('Pago no encontrado');
        return true;
    }
};

module.exports = PagosService;

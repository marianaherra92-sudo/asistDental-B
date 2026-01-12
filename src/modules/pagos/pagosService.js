const db = require('../../config/db');
const PagosModel = require('./pagosModel');
const CuotasModel = require('../cuotas/cuotasModel');

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
        return pagos; // mejor NO lanzar error si está vacío
    },

    createPago: async (data) => {
        const {
            id_cuota,
            id_paciente,
            id_plan,
            id_clinica,
            monto,
            metodo_pago,
            fecha_pago,
            referencia,
            nota,
        } = data;

        if (!id_paciente || !id_plan || !monto || !metodo_pago) {
            throw new Error('Datos obligatorios incompletos');
        }

        const connection = await db.getConnection();

        try {
            await connection.beginTransaction();

            const pagoId = await PagosModel.create({
                id_cuota,
                id_paciente,
                id_plan,
                id_clinica,
                monto,
                metodo_pago,
                fecha_pago,
                referencia,
                nota,
            }, connection);

            if (id_cuota) {
                await CuotasModel.marcarComoPagada(id_cuota, connection);
            }

            await connection.commit();

            return {
                id_pago: pagoId,
                message: 'Pago registrado correctamente'
            };

        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
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
    },
    getPagosPorPaciente: async (id_paciente) => {
        const pendientesCuotas = await PagosModel.getCuotasPendientes(id_paciente);
        const pendientesUnicos = await PagosModel.getPagosUnicosPendientes(id_paciente);
        const pagados = await PagosModel.getPagosRegistrados(id_paciente);

        return {
            pendientes: [...pendientesCuotas, ...pendientesUnicos],
            pagados
        };
    },
    getResumenPagosClinica: async (id_clinica) => {
        const pagados = await PagosModel.getPagosRegistradosPorClinica(id_clinica);
        const cuotasPendientes = await PagosModel.getCuotasPendientesPorClinica(id_clinica);
        const pagosUnicosPendientes = await PagosModel.getPagosUnicosPendientesPorClinica(id_clinica);

        return {
            pagados,
            pendientes: [
                ...cuotasPendientes,
                ...pagosUnicosPendientes
            ]
        };
    }
};

module.exports = PagosService;

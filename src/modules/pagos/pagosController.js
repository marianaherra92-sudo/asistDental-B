const PagosService = require('./pagosService');

const PagosController = {

    getPagos: async (req, res) => {
        try {
            const pagos = await PagosService.getPagos();
            res.json(pagos);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getPagoById: async (req, res) => {
        try {
            const pago = await PagosService.getPagoById(req.params.id);
            res.json(pago);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    },

    getPagosByPaciente: async (req, res) => {
        try {
            const pagos = await PagosService.getPagosByPaciente(req.params.id_paciente);
            res.json(pagos);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    },

    getPagosPorPaciente: async (req, res) => {
        const { id_paciente } = req.params;

        try {
            const pagos = await PagosService.getPagosPorPaciente(id_paciente);
            res.json(pagos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener los pagos del paciente' });
        }
    },

    createPago: async (req, res) => {
        try {
            const pago = await PagosService.createPago(req.body);
            res.status(201).json({
                message: 'Pago registrado correctamente',
                pago
            });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    updatePago: async (req, res) => {
        try {
            const pago = await PagosService.updatePago(req.params.id, req.body);
            res.json(pago);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    },

    deletePago: async (req, res) => {
        try {
            await PagosService.deletePago(req.params.id);
            res.json({ message: 'Pago eliminado correctamente' });
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    },

    getResumenPagosClinica: async (req, res) => {
        try {
            const { id_clinica } = req.params;
            const data = await PagosService.getResumenPagosClinica(id_clinica);
            res.json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener pagos de la clínica' });
        }
    }

};

module.exports = PagosController;

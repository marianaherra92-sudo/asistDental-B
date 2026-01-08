const CuotasModel = require('./cuotasModel');
const db = require('../../config/db');

const CuotasService = {
    getCuotas: async () => {
        return await CuotasModel.getAll();
    },

    getCuotaById: async (id_cuota) => {
        const cuota = await CuotasModel.getById(id_cuota);
        if (!cuota) throw new Error('Cuota no encontrada');
        return cuota;
    },

    getCuotasByPlan: async (id_plan) => {
        const cuotas = await CuotasModel.getByPlanId(id_plan);
        if (!cuotas.length) throw new Error('No se encontraron cuotas para este plan');
        return cuotas;
    },

    getCuotasByPaciente: async (id_paciente) => {
        const cuotas = await CuotasModel.getByPacienteId(id_paciente);
        if (!cuotas.length) throw new Error('No se encontraron cuotas para este paciente');
        return cuotas;
    },

    createCuota: async (data) => {
        // Validaciones
        if (!data.id_plan) throw new Error('El id_plan es obligatorio');
        if (!data.id_paciente) throw new Error('El id_paciente es obligatorio');
        if (!data.monto) throw new Error('El monto es obligatorio');
        if (!data.fecha_programada) throw new Error('La fecha_programada es obligatoria');

        const [plan] = await db.query(`SELECT * FROM plan_tratamiento WHERE id_plan = ?`, [data.id_plan]);
        if (!plan.length) throw new Error('El plan de tratamiento no existe');

        const [paciente] = await db.query(`SELECT * FROM pacientes WHERE id_paciente = ?`, [data.id_paciente]);
        if (!paciente.length) throw new Error('El paciente no existe');

        return await CuotasModel.create(data);
    },

    updateCuota: async (id_cuota, data) => {
        const cuota = await CuotasModel.getById(id_cuota);
        if (!cuota) throw new Error('Cuota no encontrada');

        if (data.id_plan) {
            const [plan] = await db.query(`SELECT * FROM plan_tratamiento WHERE id_plan = ?`, [data.id_plan]);
            if (!plan.length) throw new Error('El plan de tratamiento no existe');
        }

        if (data.id_paciente) {
            const [paciente] = await db.query(`SELECT * FROM pacientes WHERE id_paciente = ?`, [data.id_paciente]);
            if (!paciente.length) throw new Error('El paciente no existe');
        }

        return await CuotasModel.update(id_cuota, data);
    },

    deleteCuota: async (id_cuota) => {
        const affectedRows = await CuotasModel.delete(id_cuota);
        if (!affectedRows) throw new Error('Cuota no encontrada');
        return true;
    }
};

module.exports = CuotasService;

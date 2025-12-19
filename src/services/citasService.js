const db = require('../config/db');
const CitasModel = require('../models/citasModel');

const CitasService = {
    async createCita(data) {
        const conn = await db.getConnection();
        try {
            await conn.beginTransaction();

            const [rows] = await conn.execute(
                `SELECT COUNT(*) total
                 FROM citas
                 WHERE id_dentista = ?
                   AND fecha_cita = ?
                   AND estado IN ('Pendiente','Confirmada')
                   AND (hora_inicio < ? AND hora_fin > ?) FOR UPDATE`,
                [data.id_dentista, data.fecha_cita, data.hora_fin, data.hora_inicio]
            );

            if (rows[0].total > 0) throw new Error('Horario no disponible');

            await conn.execute(
                `INSERT INTO citas (
                    id_clinica,
                    id_paciente,
                    id_dentista,
                    fecha_cita,
                    hora_inicio,
                    hora_fin,
                    notas,
                    estado,
                    creado_por
                ) VALUES (?, ?, ?, ?, ?, ?, ?, 'Pendiente', ?)`,
                [
                    data.id_clinica,
                    data.id_paciente,
                    data.id_dentista,
                    data.fecha_cita,
                    data.hora_inicio,
                    data.hora_fin,
                    data.notas,
                    data.creado_por,
                ]
            );

            await conn.commit();
            return { success: true };
        } catch (err) {
            await conn.rollback();
            throw err;
        } finally {
            conn.release();
        }
    },

    getAgendaByDate(id_clinica, fecha) {
        return CitasModel.getByDate(id_clinica, fecha);
    },

    getAgendaByWeek(id_clinica, start_date, end_date) {
        return CitasModel.getByWeek(id_clinica, start_date, end_date);
    },

    getAgendaByMonth(id_clinica, year, month) {
        return CitasModel.getByMonth(id_clinica, year, month);
    },

    cancelar(id_cita) {
        return CitasModel.updateStatus(id_cita, 'Cancelada');
    },

    confirmar(id_cita) {
        return CitasModel.updateStatus(id_cita, 'Confirmada');
    },

    completar(id_cita) {
        return CitasModel.updateStatus(id_cita, 'Completada');
    },

    async reagendar(id_cita, data) {
        const [rows] = await CitasModel.hasOverlap(data);
        if (rows[0].total > 0) throw new Error('Horario no disponible');
        return CitasModel.update(id_cita, data);
    },

    getCitasByPaciente(id_paciente) {
        return CitasModel.getByPaciente(id_paciente);
    },

};

module.exports = CitasService;

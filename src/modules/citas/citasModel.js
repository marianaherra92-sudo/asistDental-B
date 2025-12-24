const db = require('../../config/db');

const CitasModel = {
    create(data) {
        return db.execute(
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
                data.creado_por
            ]
        );
    },

    getByDate(id_clinica, fecha) {
        return db.execute(
            `SELECT c.*, 
              p.nombre AS paciente,
              d.nombre AS dentista
           FROM citas c
           JOIN pacientes p ON p.id_paciente = c.id_paciente
           JOIN dentistas d ON d.id_dentista = c.id_dentista
           WHERE c.id_clinica = ?
             AND c.fecha_cita = ?
           ORDER BY c.hora_inicio`,
            [id_clinica, fecha]
        );
    },

    getByWeek(id_clinica, start_date, end_date) {
        return db.execute(
            `SELECT c.*, 
              p.nombre AS paciente,
              d.nombre AS dentista
           FROM citas c
           JOIN pacientes p ON p.id_paciente = c.id_paciente
           JOIN dentistas d ON d.id_dentista = c.id_dentista
           WHERE c.id_clinica = ?
             AND c.fecha_cita BETWEEN ? AND ?
           ORDER BY c.fecha_cita, c.hora_inicio`,
            [id_clinica, start_date, end_date]
        );
    },

    getByMonth(id_clinica, year, month) {
        return db.execute(
            `SELECT c.*, 
              p.nombre AS paciente,
              d.nombre AS dentista
           FROM citas c
           JOIN pacientes p ON p.id_paciente = c.id_paciente
           JOIN dentistas d ON d.id_dentista = c.id_dentista
           WHERE c.id_clinica = ?
             AND YEAR(c.fecha_cita) = ?
             AND MONTH(c.fecha_cita) = ?
           ORDER BY c.fecha_cita, c.hora_inicio`,
            [id_clinica, year, month]
        );
    },

    hasOverlap({ id_dentista, fecha_cita, hora_inicio, hora_fin }) {
        return db.execute(
            `SELECT COUNT(*) total
             FROM citas
             WHERE id_dentista = ?
               AND fecha_cita = ?
               AND estado IN ('Pendiente','Confirmada')
               AND (hora_inicio < ? AND hora_fin > ?)`,
            [id_dentista, fecha_cita, hora_fin, hora_inicio]
        );
    },

    updateStatus(id_cita, estado) {
        return db.execute(
            `UPDATE citas SET estado = ? WHERE id_cita = ?`,
            [estado, id_cita]
        );
    },

    update(id_cita, data) {
        return db.execute(
            `UPDATE citas
             SET fecha_cita = ?, hora_inicio = ?, hora_fin = ?
             WHERE id_cita = ?`,
            [data.fecha_cita, data.hora_inicio, data.hora_fin, id_cita]
        );
    },

    getByPaciente(id_paciente) {
        return db.execute(
            `SELECT c.*,
                cl.nombre AS clinica,
                d.nombre AS dentista
         FROM citas c
         JOIN clinicas cl ON cl.id_clinica = c.id_clinica
         JOIN dentistas d ON d.id_dentista = c.id_dentista
         WHERE c.id_paciente = ?
         ORDER BY c.fecha_cita DESC, c.hora_inicio DESC`,
            [id_paciente]
        );
    },

};

module.exports = CitasModel;

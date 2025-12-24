const db = require('../../config/db');

const AgendaModel = {

    createBlock(data) {
        return db.execute(
            `INSERT INTO bloques_disponibilidad
       (id_clinica, dia_semana, hora_inicio, hora_fin)
       VALUES (?, ?, ?, ?)`,
            [
                data.id_clinica,
                data.dia_semana,
                data.hora_inicio,
                data.hora_fin
            ]
        );
    },

    getBlocksByClinic(id_clinica) {
        return db.execute(
            `SELECT *
       FROM bloques_disponibilidad
       WHERE id_clinica = ? AND activo = TRUE
       ORDER BY dia_semana, hora_inicio`,
            [id_clinica]
        );
    },

    updateBlock(id_bloque, data) {
        return db.execute(
            `UPDATE bloques_disponibilidad
       SET hora_inicio = ?, hora_fin = ?
       WHERE id_bloque = ?`,
            [data.hora_inicio, data.hora_fin, id_bloque]
        );
    },

    softDeleteBlock(id_bloque) {
        return db.execute(
            `UPDATE bloques_disponibilidad
       SET activo = FALSE
       WHERE id_bloque = ?`,
            [id_bloque]
        );
    }

};

module.exports = AgendaModel;

const db = require('../../../config/db');

const OdontogramaDiagnostico = {
    async add(data) {
        const {
            id_odontograma,
            id_catalogo_diagnostico,
            numero_diente,
            superficie,
            observaciones,
            otro
        } = data;

        await db.query(
            `INSERT INTO odontograma_diagnosticos
      (id_odontograma, id_catalogo_diagnostico, numero_diente, superficie, observaciones, otro)
      VALUES (?, ?, ?, ?, ?, ?)`,
            [
                id_odontograma,
                id_catalogo_diagnostico,
                numero_diente,
                superficie,
                observaciones,
                otro
            ]
        );
    },

    async findByOdontograma(id_odontograma) {
        const [rows] = await db.query(
            `SELECT 
            d.*,
            c.nombre,
            c.color_icon,
            c.simbolo
        FROM odontograma_diagnosticos d
        INNER JOIN catalogo_diagnosticos c 
            ON c.id_diagnostico = d.id_catalogo_diagnostico
        WHERE d.id_odontograma = ?`,
            [id_odontograma]
        );

        return rows;
    },

    async delete(id_diente) {
        await db.query(
            `DELETE FROM odontograma_diagnosticos WHERE id_diente = ?`,
            [id_diente]
        );
    }
};

module.exports = OdontogramaDiagnostico;

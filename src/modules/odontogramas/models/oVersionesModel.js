const db = require('../../../config/db');

const OdontogramaVersion = {
    async getNextVersionNumber(id_odontograma) {
        const [[row]] = await db.query(
            `SELECT COALESCE(MAX(numero_version), 0) + 1 AS version
       FROM odontograma_versiones
       WHERE id_odontograma = ?`,
            [id_odontograma]
        );
        return row.version;
    },

    async create(data) {
        const {
            id_odontograma,
            numero_version,
            snapshot,
            creado_por
        } = data;

        await db.query(
            `INSERT INTO odontograma_versiones
       (id_odontograma, numero_version, snapshot, creado_por)
       VALUES (?, ?, ?, ?)`,
            [
                id_odontograma,
                numero_version,
                JSON.stringify(snapshot),
                creado_por
            ]
        );
    },

    async findByOdontograma(id_odontograma) {
        const [rows] = await db.query(
            `SELECT *
       FROM odontograma_versiones
       WHERE id_odontograma = ?`,
            [id_odontograma]
        );
        return rows;
    }
};

module.exports = OdontogramaVersion;

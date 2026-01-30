const db = require('../../../config/db');

const Odontograma = {
    async create(data, connection = db) {
        const { id_clinica, id_paciente } = data;

        const [result] = await connection.query(
            `INSERT INTO odontogramas (id_clinica, id_paciente, version)
         VALUES (?, ?, 1)`,
            [id_clinica, id_paciente]
        );

        return result.insertId;
    },

    async findByPaciente(id_paciente) {
        const [rows] = await db.query(
            `SELECT *
       FROM odontogramas
       WHERE id_paciente = ?
       ORDER BY fecha_creacion DESC`,
            [id_paciente]
        );
        return rows;
    },

    async findById(id_odontograma) {
        const [[row]] = await db.query(
            `SELECT *
       FROM odontogramas
       WHERE id_odontograma = ?`,
            [id_odontograma]
        );
        return row;
    },

    async update(id_odontograma, data) {
        const { nota_cierre, estado } = data;

        await db.query(
            `UPDATE odontogramas
       SET nota_cierre = ?, estado = ?
       WHERE id_odontograma = ?`,
            [nota_cierre ?? null, estado ?? 'Activo', id_odontograma]
        );
    },

    async archive(id_odontograma) {
        const [result] = await db.query(
            `UPDATE odontogramas
         SET estado = 'Archivado'
         WHERE id_odontograma = ?`,
            [id_odontograma]
        );

        return result.affectedRows;
    },

    async archiveAndCreateNew(id_odontograma) {
        const connection = await db.getConnection();

        try {
            await connection.beginTransaction();

            // 1. Obtener odontograma actual
            const [[current]] = await connection.query(
                `SELECT id_paciente, id_clinica, version
             FROM odontogramas
             WHERE id_odontograma = ?`,
                [id_odontograma]
            );

            if (!current) {
                await connection.rollback();
                return null;
            }

            // 2. Archivar
            await connection.query(
                `UPDATE odontogramas
             SET estado = 'Archivado'
             WHERE id_odontograma = ?`,
                [id_odontograma]
            );

            // 3. Crear nuevo odontograma
            const [result] = await connection.query(
                `INSERT INTO odontogramas (id_clinica, id_paciente, version, estado)
             VALUES (?, ?, ?, 'Activo')`,
                [
                    current.id_clinica,
                    current.id_paciente,
                    current.version + 1
                ]
            );

            await connection.commit();

            return result.insertId;

        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    },

    async archiveAndSnapshot(id_odontograma, snapshot, creado_por, nota_cierre) {
        const connection = await db.getConnection();

        try {
            await connection.beginTransaction();

            const [[current]] = await connection.query(
                `SELECT id_paciente, id_clinica, version
             FROM odontogramas
             WHERE id_odontograma = ?`,
                [id_odontograma]
            );

            if (!current) {
                await connection.rollback();
                return null;
            }

            await connection.query(
                `UPDATE odontogramas
                 SET estado = 'Archivado',
                     nota_cierre = ?
                 WHERE id_odontograma = ?`,
                [nota_cierre, id_odontograma]
            );

            await connection.query(
                `INSERT INTO odontograma_versiones
             (id_odontograma, numero_version, snapshot, creado_por)
             VALUES (?, ?, ?, ?)`,
                [
                    id_odontograma,
                    current.version,
                    JSON.stringify(snapshot),
                    creado_por
                ]
            );

            const [result] = await connection.query(
                `INSERT INTO odontogramas (id_clinica, id_paciente, version, estado)
             VALUES (?, ?, ?, 'Activo')`,
                [
                    current.id_clinica,
                    current.id_paciente,
                    current.version + 1
                ]
            );

            await connection.commit();

            return result.insertId;

        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

};

module.exports = Odontograma;

const db = require("../../../config/db");
const Odontograma = require("../models/odontogramaModel");

const OdontogramaService = {
    async createNewOdontograma(data) {
        const { id_paciente } = data;
        const connection = await db.getConnection();

        try {
            await connection.beginTransaction();

            await connection.query(
                `UPDATE odontogramas
             SET estado = 'Archivado'
             WHERE id_paciente = ? AND estado = 'Activo'`,
                [id_paciente]
            );

            const odontogramaId = await Odontograma.create(data, connection);

            await connection.commit();
            return odontogramaId;

        } catch (error) {
            await connection.rollback();
            throw error;

        } finally {
            connection.release();
        }
    }
};

module.exports = OdontogramaService;

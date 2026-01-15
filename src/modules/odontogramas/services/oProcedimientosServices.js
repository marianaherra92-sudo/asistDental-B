const db = require('../../../config/db');
const OdontogramaProcedimiento = require('../models/oProcedimientosModel');
const MaterialUsado = require('../models/materialUsadoModel');

async function crearProcedimientoConMateriales(data) {
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        const procedimientoId = await OdontogramaProcedimiento.add(
            data.procedimiento,
            connection
        );

        for (const material of data.materiales) {
            await MaterialUsado.add(
                {
                    ...material,
                    id_odontograma_procedimiento: procedimientoId
                },
                connection
            );
        }

        await connection.commit();
        return procedimientoId;

    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

module.exports = {
    crearProcedimientoConMateriales
};

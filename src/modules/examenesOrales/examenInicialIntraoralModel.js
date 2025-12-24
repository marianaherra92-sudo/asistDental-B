const db = require('../../config/db');

const ExamenInicialIntraoral = {

    async create(data) {
        const [result] = await db.execute(
            `
      INSERT INTO examen_clinico_inicial_intraoral (
        id_paciente,
        encia,
        orofaringe,
        lengua,
        piso_boca,
        paladar_duro,
        tipo_oclusion,
        paladar_blando,
        reborde_residual
      )
      VALUES (?, ?, ?, ?, ?, ?, ?,?,?)
      `,
            [
                data.id_paciente,
                data.encia || null,
                data.orofaringe || null,
                data.lengua || null,
                data.piso_boca || null,
                data.paladar_duro || null,
                data.tipo_oclusion || null,
                data.paladar_blando || null,
                data.reborde_residual || null
            ]
        );

        return result.insertId;
    }

};

module.exports = ExamenInicialIntraoral;

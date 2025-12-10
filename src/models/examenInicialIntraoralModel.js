const db = require('../config/db');

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
        tipo_oclusion
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
            [
                data.id_paciente,
                data.encia || null,
                data.orofaringe || null,
                data.lengua || null,
                data.piso_boca || null,
                data.paladar_duro || null,
                data.tipo_oclusion || null
            ]
        );

        return result.insertId;
    }

};

module.exports = ExamenInicialIntraoral;

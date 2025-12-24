const db = require('../../config/db');

const ExamenInicialExtraoral = {

    async create(data) {
        const [result] = await db.execute(
            `
      INSERT INTO examen_clinico_inicial_extraoral (
        id_paciente,
        cabeza,
        cara,
        atm,
        ganglios,
        labios,
        senales_particulares
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
            [
                data.id_paciente,
                data.cabeza || null,
                data.cara || null,
                data.atm || null,
                data.ganglios || null,
                data.labios || null,
                data.senales_particulares || null
            ]
        );

        return result.insertId;
    }

};

module.exports = ExamenInicialExtraoral;

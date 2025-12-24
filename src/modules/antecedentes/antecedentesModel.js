const db = require('../../config/db');

const Antecedentes = {

    async create(data, conn = db) {
        if (!data.id_paciente) throw new Error('id_paciente es obligatorio');
        if (!data.id_tipo_antecedente) throw new Error('id_tipo_antecedente es obligatorio');

        const [result] = await conn.execute(
            `
        INSERT INTO antecedentes (
          id_paciente,
          id_tipo_antecedente
        )
        VALUES (?, ?)
      `,
            [
                data.id_paciente,
                data.id_tipo_antecedente
            ]
        );

        return result.insertId;
    },

    async getByPaciente(id_paciente) {
        const [rows] = await db.execute(
            `
        SELECT a.*, t.nombre
        FROM antecedentes a
        INNER JOIN tipo_antecedente t ON t.id_tipo = a.id_tipo_antecedente
        WHERE a.id_paciente = ?
      `,
            [id_paciente]
        );
        return rows;
    }
};

module.exports = Antecedentes;

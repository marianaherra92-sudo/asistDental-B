const db = require('../../config/db');

const Consulta = {
  async create(data) {
    const [result] = await db.execute(
        `INSERT INTO consultas (
        id_clinica, id_paciente, id_dentista, motivo_consulta, examen_extraoral, examen_intraoral, fecha_consulta, proxima_cita, notas
      ) VALUES (?,?,?,?,?,?,?,?,?)`,
        [
          data.id_clinica,
          data.id_paciente,
          data.id_dentista,
          data.motivo_consulta ?? null,
          data.examen_extraoral ?? null,
          data.examen_intraoral ?? null,
          data.fecha_consulta ?? null,
          data.proxima_cita ?? null,
          data.notas ?? null
        ]
    );
    return result.insertId;
  },
  async findById(id_consulta) {
    const [rows] = await db.execute('SELECT * FROM consultas WHERE id_consulta = ?', [id_consulta]);
    return rows[0];
  },


    async findByPaciente(id_paciente) {
        const [rows] = await db.execute(
            `
    SELECT
      c.id_consulta,
      c.id_clinica,
      c.id_paciente,
      c.id_dentista,
      c.motivo_consulta,
      c.examen_extraoral,
      c.examen_intraoral,
      c.fecha_consulta,
      c.proxima_cita,
      c.notas,
      CONCAT(
        d.nombre,
        ' ',
        IFNULL(d.apellido_paterno, ''),
        ' ',
        IFNULL(d.apellido_materno, '')
      ) AS dentista_nombre
    FROM consultas c
    INNER JOIN dentistas d 
      ON c.id_dentista = d.id_dentista
    WHERE c.id_paciente = ?
      AND d.activo = 1
    ORDER BY c.fecha_consulta DESC
    `,
            [id_paciente]
        );

        return rows;
    },

    async update(id_consulta, data) {
    const [result] = await db.execute(
        `UPDATE consultas SET motivo_consulta=?, examen_extraoral=?, examen_intraoral=?, proxima_cita=?, notas=? WHERE id_consulta=?`,
        [
          data.motivo_consulta ?? null,
          data.examen_extraoral ?? null,
          data.examen_intraoral ?? null,
          data.proxima_cita ?? null,
          data.notas ?? null,
          id_consulta
        ]
    );
    return result.affectedRows;
  },
  async delete(id_consulta) {
    const [result] = await db.execute('DELETE FROM consultas WHERE id_consulta = ?', [id_consulta]);
    return result.affectedRows;
  },
};

module.exports = Consulta;

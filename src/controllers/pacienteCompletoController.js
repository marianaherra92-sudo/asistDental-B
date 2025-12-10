const Paciente = require('../models/pacienteModel');
const Antecedentes = require('../models/antecedentesModel');
const ExamenInicialExtraoral = require('../models/examenInicialExtraoralModel');
const ExamenInicialIntraoral = require('../models/examenInicialIntraoralModel');
const db = require('../config/db');

exports.createPaciente = async (req, res) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const {
      paciente,
      antecedentes,
      examen_extraoral_inicial,
      examen_intraoral_inicial
    } = req.body;

    // ================================
    // 1. Registrar paciente
    // ================================
    const id_paciente = await Paciente.create(paciente, connection);

    // ================================
    // 2. Registrar antecedentes múltiples
    // ================================
    if (antecedentes && antecedentes.length > 0) {
      for (const ant of antecedentes) {
        await Antecedentes.create({
          id_paciente,
          id_tipo_antecedente: ant.id_tipo,
        }, connection);
      }
    }

    // ================================
    // 3. Registrar examen inicial extraoral
    // ================================
    console.log(examen_extraoral_inicial)
    if (examen_extraoral_inicial) {
      await ExamenInicialExtraoral.create({
        id_paciente,
        cabeza: examen_extraoral_inicial.cabeza || null,
        cara: examen_extraoral_inicial.cara || null,
        atm: examen_extraoral_inicial.atm || null,
        ganglios: examen_extraoral_inicial.ganglios || null,
        labios: examen_extraoral_inicial.labios || null,
        senias_particulares: examen_extraoral_inicial.senias_particulares || null
      }, connection);
    }

    // ================================
    // 4. Registrar examen inicial intraoral
    // ================================
    console.log(examen_intraoral_inicial)
    if (examen_intraoral_inicial) {
      await ExamenInicialIntraoral.create({
        id_paciente,
        encia: examen_intraoral_inicial.encia || null,
        orofaringe: examen_intraoral_inicial.orofaringe || null,
        lengua: examen_intraoral_inicial.lengua || null,
        piso_boca: examen_intraoral_inicial.piso_boca || null,
        paladar_duro: examen_intraoral_inicial.paladar_duro || null,
        tipo_oclusion: examen_intraoral_inicial.tipo_oclusion || null
      }, connection);

    }

    // ================================
    // Todo correcto → guardar
    // ================================
    await connection.commit();

    res.status(201).json({
      mensaje: 'Paciente y exámenes registrados correctamente',
      id_paciente
    });

  } catch (err) {
    console.error(err);
    await connection.rollback();
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  } finally {
    connection.release();
  }
};

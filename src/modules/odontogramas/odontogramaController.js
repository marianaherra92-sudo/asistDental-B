const Odontograma = require("./models/odontogramaModel");
const Diagnostico = require("./models/oDiagnosticosModel");
const VersionService = require("./services/oVersionServices");
const OdontogramaService = require("./services/odontogramaService");
const ProcedimientoService = require("./services/oProcedimientosServices");
const MaterialUsado = require("./models/materialUsadoModel");
const Procedimiento = require("./models/oProcedimientosModel");

const create = async (req, res) => {
    const id = await OdontogramaService.createNewOdontograma(req.body);
    res.status(201).json({ id });
};

const listByPaciente = async (req, res) => {
    const data = await Odontograma.findByPaciente(req.params.idPaciente);
    res.json(data);
};

const getFull = async (req, res) => {
    const id = req.params.id;

    const odontograma = await Odontograma.findById(id);
    const diagnosticos = await Diagnostico.findByOdontograma(id);
    const procedimientos = await Procedimiento.findByOdontograma(id);

    for (const proc of procedimientos) {
        proc.materiales = await MaterialUsado.findByProcedimiento(
            proc.id_odontograma_procedimiento
        );
    }

    res.json({ odontograma, diagnosticos, procedimientos });
};

const update = async (req, res) => {
    await Odontograma.update(req.params.id, req.body);
    res.json({ message: "Odontograma actualizado" });
};

const archive = async (req, res) => {
    await Odontograma.archive(req.params.id);
    res.json({ message: "Odontograma archivado" });
};

const addDiagnostico = async (req, res) => {
    await Diagnostico.add({
        ...req.body,
        id_odontograma: req.params.id
    });
    res.status(201).json({ message: "Diagnóstico agregado" });
};

const deleteDiagnostico = async (req, res) => {
    await Diagnostico.delete(req.params.id);
    res.json({ message: "Diagnóstico eliminado" });
};

const addProcedimiento = async (req, res) => {
    try {
        const procedimientoId =
            await ProcedimientoService.crearProcedimientoConMateriales({
                procedimiento: {
                    ...req.body.procedimiento,
                    id_odontograma: req.params.id
                },
                materiales: req.body.materiales || []
            });

        res.status(201).json({
            message: "Procedimiento agregado",
            id_procedimiento: procedimientoId
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error al registrar procedimiento"
        });
    }
};

const createVersion = async (req, res) => {
    const { snapshot } = req.body;
    const userId = req.user?.id ?? null; // por si no hay auth aún

    await VersionService.createSnapshotVersion(
        req.params.id,
        snapshot,
        userId
    );

    res.status(201).json({ message: "Versión creada" });
};

module.exports = {
    create,
    listByPaciente,
    getFull,
    update,
    archive,
    addDiagnostico,
    deleteDiagnostico,
    addProcedimiento,
    createVersion
};

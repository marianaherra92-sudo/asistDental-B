const Odontograma = require("./models/odontogramaModel");
const Diagnostico = require("./models/oDiagnosticosModel");
const Procedimiento = require("./models/oProcedimientosModel");
const VersionService = require("./services/oVersionServices");
const OdontogramaService = require("./services/odontogramaService");

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
    await Procedimiento.add({
        ...req.body,
        id_odontograma: req.params.id
    });
    res.status(201).json({ message: "Procedimiento agregado" });
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

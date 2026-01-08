const Versiones = require("../models/oVersionesModel");

const OdontogramaVersionService = {
    async createSnapshotVersion(idOdontograma, snapshot, userId) {
        const version = await Versiones.getNextVersionNumber(idOdontograma);

        await Versiones.create({
            id_odontograma: idOdontograma,
            numero_version: version,
            snapshot,
            creado_por: userId
        });
    }
};

module.exports = OdontogramaVersionService;

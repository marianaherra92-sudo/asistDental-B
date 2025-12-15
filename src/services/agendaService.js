const AgendaModel = require('../models/agendaModel');

const AgendaService = {

    async createBlock(data) {
        if (data.hora_inicio >= data.hora_fin) {
            throw new Error('La hora inicio debe ser menor a hora fin');
        }
        return AgendaModel.createBlock(data);
    },

    getBlocks(id_clinica) {
        return AgendaModel.getBlocksByClinic(id_clinica);
    },

    updateBlock(id, data) {
        return AgendaModel.updateBlock(id, data);
    },

    deleteBlock(id) {
        return AgendaModel.softDeleteBlock(id);
    }

};

module.exports = AgendaService;

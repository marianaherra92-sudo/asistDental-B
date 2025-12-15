const AgendaService = require('../services/agendaService');

exports.create = async (req, res, next) => {
    try {
        await AgendaService.createBlock(req.body);
        res.status(201).json({ message: 'Bloque creado' });
    } catch (err) {
        next(err);
    }
};

exports.list = async (req, res, next) => {
    try {
        const [rows] = await AgendaService.getBlocks(req.params.id_clinica);
        res.json(rows);
    } catch (err) {
        next(err);
    }
};

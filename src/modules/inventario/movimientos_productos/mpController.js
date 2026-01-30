const MovimientosInventario = require('./mpModel');

const getAllByClinica = async (req, res) => {
    try {
        const data = await MovimientosInventario.getByClinica(req.params.id_clinica);
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

const getById = async (req, res) => {
    try {
        const data = await MovimientosInventario.getById(req.params.id);
        if (!data) {
            return res.status(404).json({ message: "Movimiento no encontrado" });
        }
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

const create = async (req, res) => {
    try {
        const id_movimiento = await MovimientosInventario.create(req.body);
        res.status(201).json({ id_movimiento });
    } catch (err) {
        if (err.sqlState === '45000') {
            return res.status(400).json({ message: err.sqlMessage });
        }
        res.status(500).json({ error: err.message });
    }
};

const update = async (req, res) => {
    try {
        await MovimientosInventario.update(req.params.id, req.body);
        res.json({ message: "Movimiento actualizado" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

const remove = async (req, res) => {
    try {
        await MovimientosInventario.delete(req.params.id);
        res.json({ message: "Movimiento eliminado" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllByClinica,
    getById,
    create,
    update,
    remove
};

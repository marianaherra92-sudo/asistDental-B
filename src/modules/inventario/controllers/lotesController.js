const LotesProductos = require('../models/lotesModel');

const getByProducto = async (req, res) => {
    const data = await LotesProductos.getByProducto(req.params.id_producto);
    res.json(data);
};

const create = async (req, res) => {
    const id = await LotesProductos.create(req.body);
    res.status(201).json({ id_lote: id });
};

const update = async (req, res) => {
    await LotesProductos.update(req.params.id, req.body);
    res.json({ message: "Lote actualizado" });
};

const remove = async (req, res) => {
    await LotesProductos.remove(req.params.id);
    res.json({ message: "Lote eliminado" });
};

module.exports = {
    getByProducto,
    create,
    update,
    remove
};

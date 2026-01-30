const Productos = require("./productosModel");

const getAllByClinica = async (req, res) => {
    const { id_clinica } = req.params;
    const data = await Productos.getByClinica(id_clinica);
    res.json(data);
};

const getById = async (req, res) => {
    const data = await Productos.getById(req.params.id);
    res.json(data);
};

const create = async (req, res) => {
    const id = await Productos.create(req.body);
    res.status(201).json({ id_producto: id });
};

const update = async (req, res) => {
    await Productos.update(req.params.id, req.body);
    res.json({ message: "Producto actualizado" });
};

const remove = async (req, res) => {
    await Productos.softDelete(req.params.id);
    res.json({ message: "Producto eliminado" });
};

const getLowStock = async (req, res) => {
    const { id_clinica } = req.params;
    const { limite } = req.query;
    const data = await Productos.getLowStock(id_clinica, limite);
    res.json(data);
};

const getExpiring = async (req, res) => {
    const { id_clinica } = req.params;
    const { dias } = req.query;
    const data = await Productos.getExpiring(id_clinica, dias);
    res.json(data);
};

const getDashboardStats = async (req, res) => {
    const { id_clinica } = req.params;
    const data = await Productos.getDashboardStats(id_clinica);
    res.json(data);
};

module.exports = {
    getAllByClinica,
    getById,
    create,
    update,
    remove,
    getLowStock,
    getExpiring,
    getDashboardStats
};

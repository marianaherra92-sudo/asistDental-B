const CatalogoProcedimientos = require('./catalogoProcedimientosModel');

exports.createCatalogo = async (req, res) => {
    try {
        const id = await CatalogoProcedimientos.create(req.body);
        res.status(201).json({ mensaje: 'Procedimiento creado', id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error interno al crear procedimiento' });
    }
};

exports.getCatalogo = async (req, res) => {
    try {
        const { id } = req.params;
        const catalogo = await CatalogoProcedimientos.findById(id);

        if (!catalogo) return res.status(404).json({ mensaje: 'Procedimiento no encontrado' });

        res.json(catalogo);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error interno' });
    }
};
exports.getCatalogoByClinica = async (req, res) => {
    try {
        const { id_clinica } = req.params;
        const catalogo = await CatalogoProcedimientos.findByIdClinica(id_clinica);

        if (!catalogo) return res.status(404).json({ mensaje: 'Procedimiento no encontrado' });

        res.json(catalogo);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error interno' });
    }
};

exports.getCatalogos = async (req, res) => {
    try {
        const catalogos = await CatalogoProcedimientos.findAll();
        res.json(catalogos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error interno' });
    }
};

exports.updateCatalogo = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await CatalogoProcedimientos.update(id, req.body);

        if (!result) return res.status(404).json({ mensaje: 'Procedimiento no encontrado' });

        res.json({ mensaje: 'Procedimiento actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error interno' });
    }
};

exports.deleteCatalogo = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await CatalogoProcedimientos.delete(id);

        if (!result) return res.status(404).json({ mensaje: 'Procedimiento no encontrado' });

        res.json({ mensaje: 'Procedimiento eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error interno' });
    }
};

const Rol = require('../models/rolModel');

const RolController = {
    async getRolesByClinica(req, res) {
        const { id_clinica } = req.params;
        try {
            const roles = await Rol.getAllForClinica(id_clinica);
            res.json(roles);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener roles' });
        }
    }
};

module.exports = RolController;

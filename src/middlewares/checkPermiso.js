module.exports = function checkPermiso(nombrePermiso) {
    return (req, res, next) => {
        const permisosUsuario = req.user?.permisos;

        if (!permisosUsuario) {
            return res.status(401).json({ error: "No autenticado" });
        }

        if (!permisosUsuario.includes(nombrePermiso)) {
            return res.status(403).json({ error: "No tienes permiso" });
        }

        next();
    };
};

module.exports = (err, req, res, next) => {
    console.error('Error:', err.message);

    res.status(400).json({
        success: false,
        message: err.message || 'Error interno del servidor'
    });
};

const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuarioModel');

exports.createUsuario = async (req, res) => {
  try {
    const { usuario, password, id_rol, id_clinica } = req.body;

    if (!usuario || !password || !id_rol || !id_clinica) {
      return res.status(400).json({ mensaje: 'Datos incompletos' });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const id_usuario = await Usuario.create({
      usuario,
      password_hash,
      id_rol,
      id_clinica,
      id_dentista: null
    });

    res.status(201).json({
      mensaje: 'Usuario creado correctamente',
      id_usuario
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }

};


exports.getUsuariosByClinica = async (req, res) => {
  try {
    const { id_clinica } = req.user; 

    const usuarios = await Usuario.findByClinica(id_clinica);

    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener usuarios' });
  }
};


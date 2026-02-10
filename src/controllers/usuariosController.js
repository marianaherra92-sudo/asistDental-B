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

exports.updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { usuario, id_rol } = req.body;

    if (!usuario || !id_rol) {
      return res.status(400).json({ mensaje: 'Datos incompletos' });
    }

    await Usuario.update(id, { usuario, id_rol });

    res.json({ mensaje: 'Usuario actualizado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar usuario' });
  }
};

exports.activarUsuarios = async (req, res) => {
  try {
    const { id } = req.params;
    const { activo } = req.body;

    if (activo === undefined) {
      return res.status(400).json({ mensaje: 'Estado inválido' });
    }

    await Usuario.activarUsuarios(id, activo);

    res.json({ mensaje: 'Estado actualizado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar estado' });
  }
};



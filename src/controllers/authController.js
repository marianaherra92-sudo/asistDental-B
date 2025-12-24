const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Clinica = require('../modules/clinica/clinicaModel');
const Usuario = require('../models/usuarioModel');
const Rol = require('../models/rolModel');
const RolPermiso = require('../models/rolPermisoModel');
const Permiso = require('../models/permisoModel');
const Dentista = require('../modules/dentistas/dentistaModel');

const JWT_SECRET = process.env.JWT_SECRET || 'clave-super-secreta';

exports.registroClinica = async (req, res) => {
  const connection = await require('../config/db').getConnection();

  try {
    await connection.beginTransaction();

    const { clinica, usuario, dentista } = req.body;

    if (!clinica?.nombre || !usuario?.usuario || !usuario?.password) {
      return res.status(400).json({ mensaje: 'Datos incompletos' });
    }

    // -----------------------------------------
    // 1. Crear clínica
    // -----------------------------------------
    const id_clinica = await Clinica.create(clinica, connection);

    // -----------------------------------------
    // 2. Crear rol SuperAdmin para esta clínica
    // -----------------------------------------
    const id_rol = await Rol.create({
      id_clinica,
      nombre_rol: 'SuperAdmin',
      descripcion: 'Administrador principal de la clínica'
    }, connection);

    // -----------------------------------------
    // 3. Obtener permisos globales excepto gestionar_saas
    // -----------------------------------------
    const permisos = await Permiso.getAllForClinica(connection); 
    // (getAllForClinica NO trae gestionar_saas)

    // 4. Asignar permisos a este rol
    for (let permiso of permisos) {
      await RolPermiso.assign(id_rol, permiso.id_permiso, connection);
    }

    // -----------------------------------------
    // 5. Crear dentista principal (opcional)
    // -----------------------------------------
    let id_dentista = null;
    if (dentista && dentista.nombre) {
      dentista.id_clinica = id_clinica;
      id_dentista = await Dentista.create(dentista, connection);
    }

    // -----------------------------------------
    // 6. Crear usuario SuperAdmin
    // -----------------------------------------
    const hash = await bcrypt.hash(usuario.password, 10);

    const id_usuario = await Usuario.create({
      id_clinica,
      id_dentista,
      usuario: usuario.usuario,
      password_hash: hash,
      id_rol
    }, connection);

    await connection.commit();

    // -----------------------------------------
    // 7. Generar token
    // -----------------------------------------
    const token = jwt.sign(
      { id_usuario, id_clinica, id_rol },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.status(201).json({
      mensaje: 'Clínica y SuperAdmin registrados correctamente',
      token
    });

  } catch (err) {
    console.error(err);
    await connection.rollback();
    res.status(500).json({ mensaje: 'Error interno de servidor' });
  } finally {
    connection.release();
  }
};

exports.login = async (req, res) => {
  try {
    const { usuario, password } = req.body;

    if (!usuario || !password) {
      return res.status(400).json({ mensaje: 'Datos incompletos' });
    }

    // 1. Buscar usuario
    const user = await Usuario.findByUsuarioWithRol(usuario);
    console.log(user);
    if (!user) {
      return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });
    }

    // 2. Validar contraseña
    const coincide = await bcrypt.compare(password, user.password_hash);
    if (!coincide) {
      return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });
    }

    // 3. Obtener permisos del rol
    const permisos = await Permiso.getPermisosByRol(user.id_rol);

    // 4. Generar token con permisos incluidos
    const token = jwt.sign(
        {
          id_usuario: user.id_usuario,
          id_clinica: user.id_clinica,
          id_dentista: user.id_dentista,
          id_rol: user.id_rol,
          permisos
        },
        JWT_SECRET,
        { expiresIn: '8h' }
    );

    // 5. Respuesta final
    res.json({
      mensaje: 'Login exitoso',
      token,
      usuario: {
        id_usuario: user.id_usuario,
        id_clinica: user.id_clinica,
        id_rol: user.id_rol,
        nombre_rol: user.nombre_rol,
        permisos
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error interno de servidor' });
  }
};

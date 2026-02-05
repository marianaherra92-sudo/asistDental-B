const db = require('../../config/db');
const Dentista = require('./dentistaModel');
const Usuario = require('../../models/usuarioModel'); 
const bcrypt = require('bcryptjs');

async function createDentistaConUsuario({ dentistaData, usuarioData, id_clinica }) {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        // 1. Crear dentista
        dentistaData.id_clinica = id_clinica;
        const id_dentista = await Dentista.create(dentistaData);

        // 2. Crear usuario
        const password_hash = await bcrypt.hash(usuarioData.password, 10);

        const id_usuario = await Usuario.create({
            id_clinica,
            id_dentista,
            usuario: usuarioData.usuario,
            password_hash,
            id_rol: usuarioData.id_rol 
        });

        await connection.commit();

        return { id_dentista, id_usuario };
    } catch (err) {
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    }
    
}

module.exports = { createDentistaConUsuario };

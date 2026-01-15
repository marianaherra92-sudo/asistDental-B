const db = require('../../config/db');

const CatalogoDiagnosticosModel = {

    findAll: async () => {
        const [rows] = await db.query(`
      SELECT * FROM catalogo_diagnosticos 
    `);
        return rows;
    },

    findById: async (id) => {
        const [rows] = await db.query(`
      SELECT * FROM catalogo_diagnosticos
      WHERE id_diagnostico = ?
    `, [id]);
        return rows[0];
    },

    create: async (data) => {
        const { nombre, tipo, color_icon, simbolo } = data;

        const [result] = await db.query(`
      INSERT INTO catalogo_diagnosticos (nombre, tipo, color_icon, simbolo)
      VALUES (?, ?, ?, ?)
    `, [nombre, tipo, color_icon, simbolo]);

        return result.insertId;
    },

    update: async (id, data) => {
        const { nombre, tipo, color_icon, simbolo } = data;

        await db.query(`
      UPDATE catalogo_diagnosticos
      SET nombre = ?, tipo = ?, color_icon = ?, simbolo = ?
      WHERE id_diagnostico = ?
    `, [nombre, tipo, color_icon, simbolo, id]);

        return true;
    },

    remove: async (id) => {
        await db.query(`
      DELETE FROM catalogo_diagnosticos
      WHERE id_diagnostico = ?
    `, [id]);

        return true;
    }
};

module.exports = CatalogoDiagnosticosModel;
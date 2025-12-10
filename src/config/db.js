const mysql = require('mysql2/promise');
require('dotenv').config();

const db = mysql.createPool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

console.log("Variables cargadas:", {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD,
    db: process.env.DB_NAME,
    port: process.env.DB_PORT
  });
  
  db.getConnection()
    .then(() => console.log("✅ Conexión a MySQL OK"))
    .catch(err => console.error("❌ Error conectando MySQL:", err));

    
module.exports = db;

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'clave-super-secreta';

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ mensaje: 'Token requerido' });
  }
  console.log("AUTH HEADER:", req.headers.authorization);


  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ mensaje: 'Token inválido' });
    }
    console.log("TOKEN DECODIFICADO BACKEND:", decoded);


    req.user = decoded;
    next();
  });
}

module.exports = authMiddleware;

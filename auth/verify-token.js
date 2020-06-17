const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    res.status(403).json({ message: 'No token provided.' });

    return;
  }

  jwt.verify(token, secretKey, (error, decoded) => {
    if (error) {
      res.status(401).json({
        message: 'Failed to authenticate token.',
      });

      return;
    }

    if (decoded) {
      req.username = decoded.username;
    }

    next();
  });
};

module.exports = verifyToken;

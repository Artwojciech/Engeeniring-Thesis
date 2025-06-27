const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Token was not found' });
  }

  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = decoded;
    next();
  });
};

const refreshToken = (req, res, next) => {
  const token = req.headers['grant']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Token was not found' });
  }

  jwt.verify(token, 'your-refresh-secret-key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = decoded;
    next();
  });
};


module.exports = {
    verifyToken,
    refreshToken
};

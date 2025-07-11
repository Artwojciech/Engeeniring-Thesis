const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'access token not found' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'unauthorized' });
    }

    req.user = decoded;
    next();
  });
};

const verifyRefreshToken = (req, res, next) => {
  const token = req.headers['x-refresh-token'];

  if (!token) {
    return res.status(401).json({ message: 'refresh token not found' });
  }

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'unauthorized' });
    }

    req.user = decoded;
    next();
  });
};

module.exports = {
  verifyToken,
  verifyRefreshToken
};

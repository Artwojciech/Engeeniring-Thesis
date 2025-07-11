const authService = require('../services/authService');

const register = async (req, res) => {
  const { username, email, password, age } = req.body;

  try {
    const { user, tokens } = await authService.registerUser({ username, email, password, age });
    res.status(201).json({ user, tokens });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const { user, tokens } = await authService.loginUser({ username, password });
    res.status(200).json({ user, tokens });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};


const refreshToken = async (req, res) => {
  try {
    const userData = {
      id: req.user.id,
      is_admin: req.user.is_admin
    };

    const tokens = authService.generateTokens(userData);

    res.status(200).json({ tokens });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};


const getCurrentUser = async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  register,
  login,
  refreshToken,
  getCurrentUser,
};

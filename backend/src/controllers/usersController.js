const userService = require('../services/usersService');

const changeUsername = async (req, res) => {
  const userId = req.params.id;
  const { username } = req.body;

  if (req.user.id !== userId) {
    return res.status(403).json({ message: 'cant change username of another user' });
  }

  try {
    const user = await userService.updateUsername(userId, username);
    res.status(200).json({ message: 'Username updated', user });
  } catch (error) {
    if (error.message === 'User not found') {
      return res.status(404).json({ message: error.message });
    }
    res.status(400).json({ message: error.message });
  }
};

const changePassword = async (req, res) => {
  const userId = req.params.id;
  const { currentPassword, newPassword } = req.body;

  if (req.user.id !== userId) {
    return res.status(403).json({ message: 'cant change another users password' });
  }

  try {
    const user = await userService.updatePassword(userId, currentPassword, newPassword);
    res.status(200).json({ message: 'Password updated', user });
  } catch (error) {
    if (error.message === 'User not found') {
      return res.status(404).json({ message: error.message });
    }
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  changeUsername,
  changePassword,
};

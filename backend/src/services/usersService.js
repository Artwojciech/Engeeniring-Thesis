const bcrypt = require('bcryptjs');
const User = require('../models/user');

const updateUsername = async (id, newUsername) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error('User not found');

  const existingUsername = await User.findOne({ where: { username: newUsername } });
  if (existingUsername) throw new Error('Username already taken');

  user.username = newUsername;
  await user.save();

  return user;
};

const updatePassword = async (id, currentPassword, newPassword) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) throw new Error('Current password is incorrect');

  //pamietac zeby dodatkowo dodac jakies wymagania do hasla ale narazie nie mam pomyslu jakie
  //pamietac tez ze jak dodam kryteria tutaj to zeby dodac je tez w authservice przy register!!
  if (newPassword.length < 8) {
    throw new Error('New password must have at least 8 characters');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();

  return user;
};

module.exports = {
  updateUsername,
  updatePassword,
};

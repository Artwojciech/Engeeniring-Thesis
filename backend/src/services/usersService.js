const bcrypt = require('bcryptjs');
const User = require('../models/user');

const updateUsername = async (id, newUsername) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error('User not found');

  const existingUsername = await User.findOne({ where: { username: newUsername } });
  if (existingUsername) throw new Error('Username already taken');

  user.username = newUsername;
  await user.save();

  const safeUser = await User.findByPk(user.id, {
    attributes: ["id", "username", "email", "age", "is_admin"]
  });

  return safeUser;
};

const updatePassword = async (id, currentPassword, newPassword) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) throw new Error('Current password is incorrect');

  const checkPass = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!checkPass.test(newPassword)) {
    throw new Error('u need 8 characters 1 upper letter and 1 number');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();

  const safeUser = await User.findByPk(user.id, {
    attributes: ["id", "username", "email", "age", "is_admin"]
  });

  return safeUser;
};

module.exports = {
  updateUsername,
  updatePassword,
};

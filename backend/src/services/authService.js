const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const generateTokens = (user) => {
  const payload = { id: user.id, is_admin: user.is_admin };
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '300s' });
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

  return { accessToken, refreshToken };
};

const registerUser = async ({ username, email, age, password }) => {
  const checkPass = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!checkPass.test(password)) {
    throw new Error('u need 8 characters 1 upper letter and 1 number');
  }


  const existingUsername = await User.findOne({ where: { username } });
  if (existingUsername) throw new Error('username already taken');

  const existingEmail = await User.findOne({ where: { email } });
  if (existingEmail) throw new Error('email already has account');

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    username,
    email,
    age,
    password: hashedPassword,
  });

  const safeUser = await User.findByPk(newUser.id, {
    attributes: ["id", "username", "email", "age", "is_admin"]
  });

  const tokens = generateTokens(newUser);
  return { user: safeUser, tokens };
};

const loginUser = async ({ username, password }) => {
  const user = await User.findOne({ where: { username } });
  if (!user) throw new Error('User with given username does not exist');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Incorrect password');

  const safeUser = await User.findByPk(user.id, {
    attributes: ["id", "username", "email", "age", "is_admin"]
  });

  const tokens = generateTokens(user);
  return { user: safeUser, tokens };
};

const getUserById = async (id) => {
  const user = await User.findByPk(id, {
    attributes: ["id", "username", "email", "age", "is_admin"]
  });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

module.exports = {
  registerUser,
  loginUser,
  generateTokens,
  getUserById,
};

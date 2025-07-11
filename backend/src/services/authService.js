const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const generateTokens = (user) => {
  const payload = { id: user.id, is_admin: user.is_admin };
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60s' });
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

  return { accessToken, refreshToken };
};

const registerUser = async ({ username, email, password, age }) => {
  const existingUsername = await User.findOne({ where: { username } });
  if (existingUsername) throw new Error('Username already taken');

  const existingEmail = await User.findOne({ where: { email } });
  if (existingEmail) throw new Error('Email already has account');

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    username,
    email,
    age,
    password: hashedPassword,
  });

  const tokens = generateTokens(newUser);
  return { user: newUser, tokens };
};

const loginUser = async ({ username, password }) => {
  const user = await User.findOne({ where: { username } });
  if (!user) throw new Error('User with given username does not exist');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Incorrect password');

  const tokens = generateTokens(user);
  return { user, tokens };
};

module.exports = {
  registerUser,
  loginUser,
  generateTokens,
};

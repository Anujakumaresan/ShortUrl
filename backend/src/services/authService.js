const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const registerUser = async (name, email, password) => {
  // Check if user exists
  const existingUser = await db.query('SELECT id FROM users WHERE email = $1', [email]);
  if (existingUser.rows.length > 0) {
    throw new Error('User already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash(password, salt);

  // Insert user
  const result = await db.query(
    'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email, role',
    [name, email, password_hash]
  );

  return result.rows[0];
};

const loginUser = async (email, password) => {
  const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  const user = result.rows[0];

  if (!user) {
    throw new Error('User not found. Please sign up first.');
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    throw new Error('Incorrect password');
  }

  delete user.password_hash;
  return user;
};

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

const getUserById = async (id) => {
  const result = await db.query('SELECT id, name, email, role, notifications_enabled FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

const updateProfile = async (id, name, notificationsEnabled) => {
  const result = await db.query(
    'UPDATE users SET name = $1, notifications_enabled = $2 WHERE id = $3 RETURNING id, name, email, role, notifications_enabled',
    [name, notificationsEnabled, id]
  );
  return result.rows[0];
};

const changePassword = async (id, currentPassword, newPassword) => {
  const result = await db.query('SELECT password_hash FROM users WHERE id = $1', [id]);
  const user = result.rows[0];
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
  if (!isMatch) throw new Error('Incorrect current password');

  const salt = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash(newPassword, salt);

  await db.query('UPDATE users SET password_hash = $1 WHERE id = $2', [password_hash, id]);
  return true;
};

module.exports = {
  registerUser,
  loginUser,
  generateToken,
  getUserById,
  updateProfile,
  changePassword
};

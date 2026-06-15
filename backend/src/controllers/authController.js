const authService = require('../services/authService');

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    const user = await authService.registerUser(name, email, password);
    const token = authService.generateToken(user);

    res.status(201).json({ user, token });
  } catch (err) {
    if (err.message === 'User already exists') {
      return res.status(400).json({ message: err.message });
    }
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await authService.loginUser(email, password);
    const token = authService.generateToken(user);

    res.status(200).json({ user, token });
  } catch (err) {
    if (err.message === 'User not found. Please sign up first.' || err.message === 'Incorrect password') {
      return res.status(401).json({ message: err.message });
    }
    next(err);
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await authService.getUserById(req.user.id);
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { name, notificationsEnabled } = req.body;
    const user = await authService.updateProfile(req.user.id, name, notificationsEnabled);
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Please provide both passwords' });
    }
    await authService.changePassword(req.user.id, currentPassword, newPassword);
    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    if (err.message === 'Incorrect current password') {
      return res.status(400).json({ message: err.message });
    }
    next(err);
  }
};

module.exports = {
  register,
  login,
  getMe,
  updateProfile,
  changePassword
};

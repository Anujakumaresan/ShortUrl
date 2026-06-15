const adminService = require('../services/adminService');

const getSystemStats = async (req, res, next) => {
  try {
    const stats = await adminService.getGlobalStats();
    res.status(200).json(stats);
  } catch (err) {
    next(err);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await adminService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getSystemStats,
  getUsers
};

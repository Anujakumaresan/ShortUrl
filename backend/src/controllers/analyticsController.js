const analyticsService = require('../services/analyticsService');

const getStats = async (req, res, next) => {
  try {
    const { shortId } = req.params;
    const stats = await analyticsService.getUrlStats(req.user.id, shortId);
    res.status(200).json(stats);
  } catch (err) {
    if (err.message === 'URL not found or unauthorized') {
      return res.status(404).json({ message: err.message });
    }
    next(err);
  }
};

const getDashboardStats = async (req, res, next) => {
  try {
    const stats = await analyticsService.getDashboardStats(req.user.id);
    res.status(200).json(stats);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getStats,
  getDashboardStats
};

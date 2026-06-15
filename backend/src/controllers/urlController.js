const urlService = require('../services/urlService');

const createShortUrl = async (req, res, next) => {
  try {
    const { originalUrl, customAlias, expiresAt } = req.body;
    if (!originalUrl) {
      return res.status(400).json({ message: 'Original URL is required' });
    }

    const url = await urlService.createUrl(req.user.id, originalUrl, customAlias, expiresAt);
    res.status(201).json(url);
  } catch (err) {
    if (err.message === 'Invalid URL format' || err.message === 'Alias already in use') {
      return res.status(400).json({ message: err.message });
    }
    next(err);
  }
};

const getMyUrls = async (req, res, next) => {
  try {
    const urls = await urlService.getUserUrls(req.user.id);
    res.status(200).json(urls);
  } catch (err) {
    next(err);
  }
};

const updateShortUrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { originalUrl, expiresAt } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ message: 'Original URL is required' });
    }

    const url = await urlService.updateUrl(req.user.id, id, originalUrl, expiresAt);
    res.status(200).json(url);
  } catch (err) {
    if (err.message === 'URL not found or unauthorized') {
      return res.status(404).json({ message: err.message });
    }
    if (err.message === 'Invalid URL format') {
      return res.status(400).json({ message: err.message });
    }
    next(err);
  }
};

const deleteShortUrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    await urlService.deleteUrl(req.user.id, id);
    res.status(200).json({ message: 'URL deleted successfully' });
  } catch (err) {
    if (err.message === 'URL not found or unauthorized') {
      return res.status(404).json({ message: err.message });
    }
    next(err);
  }
};

module.exports = {
  createShortUrl,
  getMyUrls,
  updateShortUrl,
  deleteShortUrl
};

const db = require('../config/db');
const geoip = require('geoip-lite');
const analyticsService = require('../services/analyticsService');

const redirect = async (req, res, next) => {
  try {
    const { shortId } = req.params;

    const result = await db.query('SELECT * FROM urls WHERE short_id = $1', [shortId]);
    const url = result.rows[0];

    if (!url) {
      return res.status(404).send('URL not found');
    }

    if (url.expires_at && new Date(url.expires_at) < new Date()) {
      return res.status(410).send('This link has expired');
    }

    // Record analytics asynchronously
    const ip = req.ip || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'] || 'Unknown';
    const referrer = req.headers['referer'] || 'Direct';
    
    // Naive parsing for browser/device (in a real app, use a library like useragent)
    let browser = 'Other';
    if (userAgent.includes('Chrome')) browser = 'Chrome';
    else if (userAgent.includes('Firefox')) browser = 'Firefox';
    else if (userAgent.includes('Safari')) browser = 'Safari';
    
    let deviceType = 'Desktop';
    if (/Mobi|Android/i.test(userAgent)) deviceType = 'Mobile';
    else if (/Tablet|iPad/i.test(userAgent)) deviceType = 'Tablet';

    let country = 'Unknown';
    const geo = geoip.lookup(ip);
    if (geo) {
      country = geo.country;
    }

    db.query(
      'INSERT INTO analytics (url_id, ip_address, user_agent, browser, device_type, country, referrer) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [url.id, ip, userAgent, browser, deviceType, country, referrer]
    ).catch(err => console.error('Failed to record analytics', err));

    // Increment click count
    db.query('UPDATE urls SET clicks = clicks + 1 WHERE id = $1', [url.id])
      .catch(err => console.error('Failed to increment clicks', err));

    // Perform redirect
    res.redirect(url.original_url);
  } catch (err) {
    next(err);
  }
};

const getPublicStats = async (req, res, next) => {
  try {
    const { shortId } = req.params;
    const stats = await analyticsService.getUrlStats(null, shortId);
    res.status(200).json(stats);
  } catch (err) {
    if (err.message === 'URL not found or unauthorized') {
      return res.status(404).json({ message: err.message });
    }
    next(err);
  }
};

module.exports = {
  redirect,
  getPublicStats
};

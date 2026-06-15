const db = require('../config/db');

const getUrlStats = async (userId, shortId) => {
  // First ensure the URL exists and optionally belongs to the user
  let urlRes;
  if (userId) {
    urlRes = await db.query('SELECT id FROM urls WHERE short_id = $1 AND user_id = $2', [shortId, userId]);
  } else {
    urlRes = await db.query('SELECT id FROM urls WHERE short_id = $1', [shortId]);
  }

  if (urlRes.rows.length === 0) {
    throw new Error('URL not found or unauthorized');
  }
  const urlId = urlRes.rows[0].id;

  // Get total clicks
  const totalRes = await db.query('SELECT clicks FROM urls WHERE id = $1', [urlId]);
  const totalClicks = totalRes.rows[0].clicks;

  // Get clicks over time (last 7 days for example)
  const clicksByDateRes = await db.query(`
    SELECT DATE(created_at) as date, COUNT(*) as clicks 
    FROM analytics 
    WHERE url_id = $1 
    GROUP BY DATE(created_at) 
    ORDER BY date ASC
  `, [urlId]);

  // Get browser stats
  const browserRes = await db.query(`
    SELECT browser as name, COUNT(*) as value 
    FROM analytics 
    WHERE url_id = $1 
    GROUP BY browser
  `, [urlId]);

  // Get device stats
  const deviceRes = await db.query(`
    SELECT device_type as name, COUNT(*) as value 
    FROM analytics 
    WHERE url_id = $1 
    GROUP BY device_type
  `, [urlId]);

  // Get country stats (mocked if IP tracking is not fully implemented)
  const countryRes = await db.query(`
    SELECT COALESCE(country, 'Unknown') as name, COUNT(*) as value 
    FROM analytics 
    WHERE url_id = $1 
    GROUP BY COALESCE(country, 'Unknown')
  `, [urlId]);

  // Get last visited time
  const lastVisitRes = await db.query(`
    SELECT MAX(created_at) as last_visited 
    FROM analytics 
    WHERE url_id = $1
  `, [urlId]);
  const lastVisitedTime = lastVisitRes.rows[0].last_visited;

  // Get recent visit history
  const recentVisitsRes = await db.query(`
    SELECT ip_address, user_agent, browser, device_type, country, referrer, created_at 
    FROM analytics 
    WHERE url_id = $1 
    ORDER BY created_at DESC 
    LIMIT 10
  `, [urlId]);

  return {
    totalClicks,
    clicksByDate: clicksByDateRes.rows,
    browserStats: browserRes.rows,
    deviceStats: deviceRes.rows,
    countryStats: countryRes.rows,
    lastVisitedTime,
    recentVisits: recentVisitsRes.rows
  };
};

const getDashboardStats = async (userId) => {
  // Get total clicks across all user's URLs
  const totalRes = await db.query(`
    SELECT SUM(clicks) as total_clicks 
    FROM urls 
    WHERE user_id = $1
  `, [userId]);
  const totalClicks = parseInt(totalRes.rows[0].total_clicks || 0);

  // Get clicks over time (aggregate)
  const clicksByDateRes = await db.query(`
    SELECT DATE(a.created_at) as date, COUNT(*) as clicks 
    FROM analytics a
    JOIN urls u ON a.url_id = u.id
    WHERE u.user_id = $1
    GROUP BY DATE(a.created_at)
    ORDER BY date ASC
  `, [userId]);

  // Get last visited time
  const lastVisitRes = await db.query(`
    SELECT MAX(a.created_at) as last_visited 
    FROM analytics a
    JOIN urls u ON a.url_id = u.id
    WHERE u.user_id = $1
  `, [userId]);
  const lastVisitedTime = lastVisitRes.rows[0]?.last_visited;

  // Get recent visit history across all URLs
  const recentVisitsRes = await db.query(`
    SELECT a.ip_address, a.user_agent, a.browser, a.device_type, a.country, a.referrer, a.created_at 
    FROM analytics a
    JOIN urls u ON a.url_id = u.id
    WHERE u.user_id = $1 
    ORDER BY a.created_at DESC 
    LIMIT 10
  `, [userId]);

  return {
    totalClicks,
    clicksByDate: clicksByDateRes.rows,
    lastVisitedTime,
    recentVisits: recentVisitsRes.rows
  };
};

module.exports = {
  getUrlStats,
  getDashboardStats
};

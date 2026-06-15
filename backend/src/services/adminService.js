const db = require('../config/db');

const getGlobalStats = async () => {
  const usersRes = await db.query('SELECT COUNT(*) FROM users');
  const urlsRes = await db.query('SELECT COUNT(*) FROM urls');
  const clicksRes = await db.query('SELECT SUM(clicks) FROM urls');
  
  // Active users in last 7 days
  const activeRes = await db.query(`
    SELECT COUNT(DISTINCT user_id) FROM urls 
    WHERE created_at > CURRENT_TIMESTAMP - INTERVAL '7 days'
  `);

  const recentUsersRes = await db.query(`
    SELECT id, name, email, created_at as "joinedAt" 
    FROM users 
    ORDER BY created_at DESC 
    LIMIT 5
  `);

  return {
    totalUsers: parseInt(usersRes.rows[0].count),
    totalUrls: parseInt(urlsRes.rows[0].count),
    totalClicks: parseInt(clicksRes.rows[0].sum || 0),
    activeUsers: parseInt(activeRes.rows[0].count),
    recentUsers: recentUsersRes.rows
  };
};

const getAllUsers = async () => {
  const result = await db.query(`
    SELECT u.id, u.name, u.email, u.role, COUNT(url.id) as urls 
    FROM users u
    LEFT JOIN urls url ON u.id = url.user_id
    GROUP BY u.id
    ORDER BY u.created_at DESC
  `);
  return result.rows.map(row => ({
    ...row,
    urls: parseInt(row.urls)
  }));
};

module.exports = {
  getGlobalStats,
  getAllUsers
};

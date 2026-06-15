const db = require('../config/db');
const generateShortCode = require('../utils/generateShortCode');
const validateUrl = require('../utils/validateUrl');

const createUrl = async (userId, originalUrl, customAlias = null, expiresAt = null) => {
  if (!validateUrl(originalUrl)) {
    throw new Error('Invalid URL format');
  }

  let shortId = customAlias;
  if (shortId) {
    const existing = await db.query('SELECT id FROM urls WHERE short_id = $1', [shortId]);
    if (existing.rows.length > 0) {
      throw new Error('Alias already in use');
    }
  } else {
    // Generate unique short code
    let isUnique = false;
    while (!isUnique) {
      shortId = generateShortCode();
      const existing = await db.query('SELECT id FROM urls WHERE short_id = $1', [shortId]);
      if (existing.rows.length === 0) {
        isUnique = true;
      }
    }
  }

  const result = await db.query(
    'INSERT INTO urls (user_id, original_url, short_id, expires_at) VALUES ($1, $2, $3, $4) RETURNING *',
    [userId, originalUrl, shortId, expiresAt]
  );
  return result.rows[0];
};

const getUserUrls = async (userId) => {
  const result = await db.query(
    'SELECT * FROM urls WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  );
  return result.rows;
};

const updateUrl = async (userId, id, originalUrl, expiresAt = null) => {
  if (!validateUrl(originalUrl)) {
    throw new Error('Invalid URL format');
  }

  const result = await db.query(
    'UPDATE urls SET original_url = $1, expires_at = $2 WHERE id = $3 AND user_id = $4 RETURNING *',
    [originalUrl, expiresAt, id, userId]
  );

  if (result.rows.length === 0) {
    throw new Error('URL not found or unauthorized');
  }

  return result.rows[0];
};

const deleteUrl = async (userId, id) => {
  const result = await db.query(
    'DELETE FROM urls WHERE id = $1 AND user_id = $2 RETURNING id',
    [id, userId]
  );

  if (result.rows.length === 0) {
    throw new Error('URL not found or unauthorized');
  }

  return true;
};

module.exports = {
  createUrl,
  getUserUrls,
  updateUrl,
  deleteUrl
};

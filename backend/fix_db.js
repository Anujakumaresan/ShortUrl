require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/shorturl'
});

async function run() {
  try {
    await pool.query(`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS notifications_enabled BOOLEAN DEFAULT true;
    `);
    console.log('notifications_enabled column verified/added successfully.');
  } catch (err) {
    console.error('Error adding column:', err);
  } finally {
    pool.end();
  }
}

run();

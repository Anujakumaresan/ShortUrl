require('dotenv').config();
const db = require('./src/config/db');

async function migrate() {
  try {
    console.log('Running migration: Adding expires_at column...');
    await db.query('ALTER TABLE urls ADD COLUMN IF NOT EXISTS expires_at TIMESTAMP WITH TIME ZONE;');
    console.log('Migration completed successfully.');
  } catch (err) {
    console.error('Migration failed:', err.message);
  } finally {
    process.exit(0);
  }
}

migrate();

require('dotenv').config();
const app = require('./app');
const db = require('./config/db');
const bcrypt = require('bcryptjs');

const PORT = process.env.PORT || 5000;

const seedAdmin = async () => {
  try {
    const res = await db.query("SELECT * FROM users WHERE role = 'admin'");
    if (res.rows.length === 0) {
      console.log('No admin found in database. Seeding default admin account...');
      const salt = await bcrypt.genSalt(10);
      const password_hash = await bcrypt.hash('admin123', salt);
      await db.query(
        "INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4)",
        ['Administrator', 'admin@linkly.com', password_hash, 'admin']
      );
      console.log('Default admin seeded successfully! Email: admin@linkly.com | Password: admin123');
    }
  } catch (error) {
    console.error('Error seeding admin:', error.message);
  }
};

app.listen(PORT, async () => {
  await seedAdmin();
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

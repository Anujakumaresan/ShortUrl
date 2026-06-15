const express = require('express');
const cors = require('cors');

// Import routes
const authRoutes = require('./routes/authRoutes');
const urlRoutes = require('./routes/urlRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const adminRoutes = require('./routes/adminRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const publicRoutes = require('./routes/publicRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

// Middlewares
app.use(cors()); // Allow all origins during local dev to handle changing ports
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/urls', urlRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);

// Public Redirect Route
app.use('/s', publicRoutes);

// Base route
app.get('/', (req, res) => {
  res.json({ message: 'Shorter API is running.' });
});

// Global Error Handler
app.use(errorMiddleware);

module.exports = app;

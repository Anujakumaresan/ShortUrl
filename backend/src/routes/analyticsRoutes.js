const express = require('express');
const { getStats, getDashboardStats } = require('../controllers/analyticsController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/dashboard', getDashboardStats);
router.get('/:shortId', getStats);

module.exports = router;

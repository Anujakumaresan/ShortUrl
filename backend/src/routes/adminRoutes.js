const express = require('express');
const { getSystemStats, getUsers } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

router.use(authMiddleware);
router.use(adminMiddleware);

router.get('/stats', getSystemStats);
router.get('/users', getUsers);

module.exports = router;

const express = require('express');
const { redirect, getPublicStats } = require('../controllers/publicController');

const router = express.Router();

router.get('/:shortId', redirect);
router.get('/:shortId/stats', getPublicStats);

module.exports = router;

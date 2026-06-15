const express = require('express');
const { createShortUrl, getMyUrls, updateShortUrl, deleteShortUrl } = require('../controllers/urlController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/', createShortUrl);
router.get('/', getMyUrls);
router.put('/:id', updateShortUrl);
router.delete('/:id', deleteShortUrl);

module.exports = router;

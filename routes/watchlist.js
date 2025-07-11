const express = require('express');
const router = express.Router();
const watchlistCtrl = require('../controllers/watchlist');
const requireLogin = require('../middleware/requireLogin'); // ✅ This should be a function

// Protect all routes
router.use(requireLogin);

router.get('/', watchlistCtrl.index);
router.get('/new', watchlistCtrl.newItem);
router.post('/', watchlistCtrl.create);
router.get('/:id/edit', watchlistCtrl.edit);
router.put('/:id', watchlistCtrl.update);
router.delete('/:id', watchlistCtrl.delete);

module.exports = router;

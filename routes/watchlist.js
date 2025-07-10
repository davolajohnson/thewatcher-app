const express = require('express');
const router = express.Router();
const watchlistCtrl = require('../controllers/watchlist');
const requireLogin = require('../middleware/auth'); // ✅ import the middleware

// ✅ Apply middleware to all WatchList routes
router.use(requireLogin);

// Protected routes
router.get('/', watchlistCtrl.index);
router.get('/new', watchlistCtrl.new);
router.post('/', watchlistCtrl.create);
router.get('/:id/edit', watchlistCtrl.edit);
router.put('/:id', watchlistCtrl.update);
router.delete('/:id', watchlistCtrl.delete);

module.exports = router;

// routes/users.js

const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users');

// Show forms
router.get('/signup', usersCtrl.showSignup);
router.get('/login', usersCtrl.showLogin);
router.get('/logout', usersCtrl.logout); // ✅ Logout route added

// Handle form submissions
router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);

module.exports = router;

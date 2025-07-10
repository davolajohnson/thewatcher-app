const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users');

// Sign up
router.get('/signup', usersCtrl.showSignup);
router.post('/signup', usersCtrl.signup);

// Login
router.get('/login', usersCtrl.showLogin);
router.post('/login', usersCtrl.login);

// Logout
router.get('/logout', usersCtrl.logout);

module.exports = router;

const User = require('../models/user');
const bcrypt = require('bcrypt');

// Show signup form
function showSignup(req, res) {
  res.render('users/signup', { error: null });
}

// Show login form
function showLogin(req, res) {
  res.render('users/login', { error: null });
}

// Handle signup POST
async function signup(req, res) {
  try {
    const existingUser = await User.findOne({ username: req.body.username });

    if (existingUser) {
      return res.render('users/signup', {
        error: 'Username already exists. Please choose another.'
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const user = new User({
      username: req.body.username,
      password: hashedPassword
    });

    await user.save();

    req.session.userId = user._id;
    res.redirect('/');
  } catch (err) {
    console.error('Signup error:', err);
    res.render('users/signup', { error: 'Signup failed. Please try again.' });
  }
}

// Handle login POST
async function login(req, res) {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.render('users/login', { error: 'Invalid username or password.' });
    }

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return res.render('users/login', { error: 'Invalid username or password.' });
    }

    req.session.userId = user._id;
    req.session.save(() => {
      res.redirect('/');
    });
  } catch (err) {
    console.error('Login error:', err);
    res.render('users/login', { error: 'Login failed. Please try again.' });
  }
}

// Logout
function logout(req, res) {
  req.session.destroy(() => {
    res.redirect('/');
  });
}

module.exports = {
  showSignup,
  showLogin,
  signup,
  login,
  logout
};

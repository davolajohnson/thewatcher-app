const User = require('../models/user');

// GET signup form
function showSignup(req, res) {
  res.render('users/signup');
}

// POST signup form
async function signup(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.create({ username, password });
    req.session.userId = user._id;
    res.redirect('/watchlist');
  } catch (err) {
    console.log(err);
    res.redirect('/users/signup');
  }
}

// GET login form
function showLogin(req, res) {
  res.render('users/login');
}

// POST login form
async function login(req, res) {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !(await user.isValidPassword(password))) {
    return res.redirect('/users/login');
  }

  req.session.userId = user._id;
  res.redirect('/watchlist');
}

// GET logout
function logout(req, res) {
  req.session.destroy(() => {
    res.redirect('/');
  });
}

module.exports = {
  showSignup,
  signup,
  showLogin,
  login,
  logout,
};

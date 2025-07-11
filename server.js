const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');
const expressLayouts = require('express-ejs-layouts');

const app = express();
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// View engine and layout
app.set('view engine', 'ejs');
app.set('layout', 'layouts/layout');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'supersecretkey',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  })
);

// Make currentUser available in all views
const User = require('./models/user');
app.use(async (req, res, next) => {
  res.locals.currentUser = null;
  if (req.session.userId) {
    try {
      const user = await User.findById(req.session.userId);
      res.locals.currentUser = user;
    } catch (err) {
      console.error('Error fetching current user:', err);
    }
  }
  next();
});

// Routes
const usersRouter = require('./routes/users');
const watchlistRoutes = require('./routes/watchlist');

app.use('/users', usersRouter);
app.use('/watchlist', watchlistRoutes);

// Home route
app.get('/', (req, res) => {
  res.render('index'); // Renders views/index.ejs
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});



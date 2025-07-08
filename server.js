// server.js

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
const MongoStore = require('connect-mongo');
const path = require('path');
require('dotenv').config();

const app = express();

// === MongoDB Connection ===
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log('✅ Connected to MongoDB Atlas');
});
mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

// === View Engine ===
app.set('view engine', 'ejs');

// === Middleware ===
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// === Session Middleware ===
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);

// === Example Route ===
app.get('/', (req, res) => {
  res.send('🎬 Welcome to The Watcher App!');
});

// === Start Server ===
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});


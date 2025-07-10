// models/watchlistItem.js

const mongoose = require('mongoose');

const watchListItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Want to Watch', 'Watching', 'Watched', 'Recommendations'],
    default: 'Want to Watch',
  },
  genre: {
    type: String,
  },
  notes: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true }); // optional: adds createdAt and updatedAt fields

module.exports = mongoose.model('WatchListItem', watchListItemSchema);

const WatchListItem = require('../models/watchlistItem');

module.exports = {
  index,
  newItem,
  create,
  edit,
  update,
  delete: deleteItem,
};

async function index(req, res) {
  const items = await WatchListItem.find({ user: req.session.userId });

  const grouped = {
    'Want to Watch': [],
    'Watching': [],
    'Watched': [],
    'Recommendations': [],
  };

  items.forEach(item => {
    grouped[item.status].push(item);
  });

  res.render('watchlist/index', { grouped });
}

function newItem(req, res) {
  res.render('watchlist/new');
}

async function create(req, res) {
  try {
    console.log('Form data:', req.body); // ✅ Debug line
    req.body.user = req.session.userId;
    await WatchListItem.create(req.body);
    res.redirect('/watchlist');
  } catch (err) {
    console.error('Error creating item:', err);
    res.redirect('/watchlist/new');
  }
}

async function edit(req, res) {
  const item = await WatchListItem.findOne({ _id: req.params.id, user: req.session.userId });
  res.render('watchlist/edit', { item });
}

async function update(req, res) {
  try {
    await WatchListItem.findOneAndUpdate(
      { _id: req.params.id, user: req.session.userId },
      req.body
    );
    res.redirect('/watchlist');
  } catch (err) {
    console.error(err);
    res.redirect('/watchlist');
  }
}

async function deleteItem(req, res) {
  await WatchListItem.findOneAndDelete({ _id: req.params.id, user: req.session.userId });
  res.redirect('/watchlist');
}

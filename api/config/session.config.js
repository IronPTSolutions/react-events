const expressSession = require('express-session');
const User = require('../models/user.model');
const MongoStore = require('connect-mongo');
const { connectionUrl } = require('../config/db.config');

const session = expressSession({
  secret: process.env.SESSION_SECRET || 'super secret (change it)',
  saveUninitialized: false,
  resave: false,
  cookie: {
    secure: process.env.SESSION_SECURE === 'true',
    httpOnly: true,
    maxAge: parseInt(process.env.SESSION_MAX_AGE) || (3600 * 24 * 7 * 1000),
  },
  store: new MongoStore({
    mongoUrl: connectionUrl,
    ttl: 3600 * 24 * 7
  })
});

const loadUser = (req, res, next) => {
  const { userId } = req.session;
  if (userId) {
    User.findById(userId)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(error => next(error));
  } else {
    next();
  }
}

module.exports.session = session;
module.exports.loadUser = loadUser;
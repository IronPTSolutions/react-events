const Event = require('../models/event.model');

module.exports.list = (req, res, next) => {
  Event.find()
    .then(events => res.json(events))
    .catch(error => next(error));
}

module.exports.create = (req, res, next) => {
  Event.create(req.body)
    .then(event => res.status(201).json(event))
    .catch(error => next(error));
}
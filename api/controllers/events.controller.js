const createError = require('http-errors');
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

module.exports.detail = (req, res, next) => {
  Event.findById(req.params.id)
    .then(event => {
      if (!event) {
        next(createError(404, `Event ${req.params.id} not found`));
      } else {
        res.json(event);
      }
    })
    .catch(error => next(error));
}

module.exports.delete = (req, res, next) => {
  Event.findByIdAndDelete(req.params.id)
    .then(event => {
      if (!event) {
        next(createError(404, `Event ${req.params.id} not found`))
      } else {
        res.status(204).send();
      }
    })
    .catch(error => next(error));
}
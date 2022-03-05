const createError = require('http-errors');
const Event = require('../models/event.model');

module.exports.list = (req, res, next) => {
  Event.find()
    .then(events => res.json(events))
    .catch(error => next(error));
}

module.exports.create = (req, res, next) => {
  const event = req.body;
  event.ownerId = req.user.id;
  Event.create(event)
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
  Event.findById(req.params.id)
    .then(event => {
      if (!event) {
        next(createError(404, `Event ${req.params.id} not found`))
      } else if (event.ownerId != req.user.id && !req.user.isAdmin()) {
        next(createError(403, `Event ${req.params.id} not owned by you`))
      } else {
        return Event.deleteOne({ _id: event.id })
          .then(() => res.status(204).send())
      }
    })
    .catch(error => next(error))
}

module.exports.edit = (req, res, next) => {
  Event.findById(req.params.id)
    .then(event => {
      if (!event) {
        next(createError(404, `Event ${req.params.id} not found`))
      } else if (event.ownerId != req.user.id && !req.user.isAdmin()) {
        next(createError(403, `Event ${req.params.id} not owned by you`))
      } else {
        delete req.body.ownerId;
        Object.assign(event, req.body); 
        return event.save()
          .then(event => res.json(event));
      }
    })
    .catch(error => next(error));
}


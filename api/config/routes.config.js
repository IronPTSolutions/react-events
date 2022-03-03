const createError = require('http-errors');
const express = require('express');
const router = express.Router();
const events = require('../controllers/events.controller');

router.get('/events', events.list);
router.post('/events', events.create);
router.get('/events/:id', events.detail);
router.delete('/events/:id', events.delete)
router.patch('/events/:id', events.edit)


router.use((req, res, next) => next(createError(404, 'Route not found')));

module.exports = router;
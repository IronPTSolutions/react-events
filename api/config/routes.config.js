const createError = require('http-errors');
const express = require('express');
const router = express.Router();
const events = require('../controllers/events.controller');

router.get('/events', events.list);
router.post('/events', events.create);


router.use((req, res, next) => next(createError(404, 'Route not found')));

module.exports = router;
require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const creatError = require('http-errors');

/* Configs */
require('./config/db.config');

const app = express();

app.use(express.json());
app.use(logger('dev'));


const routes = require('./config/routes.config');
app.use('/api', routes);

app.use((error, req, res, next) => {
  if (error instanceof mongoose.Error.ValidationError) {
    error = creatError(400, error);
  } else if (!error.status) {
    error = createError(500, error);
  }

  console.error(error);

  const data = {};
  data.message = error.message;
  if (error.errors) {
    data.errors = Object.keys(error.errors)
      .reduce((errors, key) => ({ ...errors, [key]: error.errors[key]?.message || error.errors[key] }), {});
  }
 
  res.status(error.status).json(data);
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.info(`Application running in port ${port}`));
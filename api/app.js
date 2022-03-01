require('dotenv').config();

const express = require('express');

/* Configs */
require('./config/db.config');

const app = express();


const port = process.env.PORT || 3001;
app.listen(port, () => console.info(`Application running in port ${port}`));
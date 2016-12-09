'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const knex = require('./knex');
const morgan = require('morgan');
const path = require('path');

app.disable('x-powered-by');

app.use(express.static(path.join('public')));

//require routes
const index = require('./routes/index');
app.use(index);

//error functions
app.use((_req, res) => {
  res.sendStatus(404);
});

app.use((err, _req, res, _next) => {
  if (err.output && err.output.statusCode) {
    return res
      .status(err.output.statusCode)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  }
  console.error(err.stack);
  res.sendStatus(500);
});

app.listen(port, () => {
  console.log('Listening on port ' + port);
});

module.exports = app;

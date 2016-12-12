'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const jwt = require('jsonwebtoken');
const knex = require('./knex');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.disable('x-powered-by');

require('dotenv').config();

app.use(express.static(path.join('public')));
app.use(cookieParser());
app.use(bodyParser.json());

// Authentication
const tokens = require('./routes/tokens');
app.use(tokens);

// Stops anyone from accessing anything unless logged in.
app.use((req, res, next) => {
  if(!req.cookies.token || req.cookies.token === undefined) {
    return res.status(401).send('Unauthorized.');
  }

  jwt.verify(req.cookies.token, process.env.JWT_SECRET, (e, d) => {
    if(e && d === undefined) {
      return res.status(401).send('Unauthorized.');
    }

    req.body.userId = d.userId;
    next();
  });
});

// Require the routes and define them here.
const workspace = require('./routes/workspace');
const users = require('./routes/users');
const notes = require('./routes/notes');
const folders = require('./routes/folders');

// Use the routes to navigate throughout the requests.
app.use('/', workspace);
app.use('/users', users);
app.use('/notes', notes);
app.use('/folders', folders);

// Error Functions Handling
app.use((_req, res) => {
  res.sendStatus(404);
});

app.use((err, _req, res, _next) => {
  console.log(err);
  if (err.output && err.output.statusCode) {
    return res
      .status(err.output.statusCode)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  }

  if (err.status) {
    console.log(err);
    return res.status(err.status).send(err);
  }

  console.error(err.stack);
  res.sendStatus(500);
});

app.listen(port, () => {
  console.log('Listening on port ' + port);
});

module.exports = app;

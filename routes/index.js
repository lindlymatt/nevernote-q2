'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/users', (req, res, next) => {
  knex('users')
  .orderBy('first_name')
  .then((users) => {
    res.send(users);
  }).catch((err) => {
    next(err);
  })
});

module.exports = router;

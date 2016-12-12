'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const ev = require('express-validation');
// const validations = require('../validations/notes');
// const { camelizeKeys, decamelizeKeys } = require('humps');

router.get('/', (req, res, next) => {
  const user = req.body.userId;
  knex('user_notes')
    .where('user_notes.user_id', user)
    .then((notes) => {
      res.json(notes);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;

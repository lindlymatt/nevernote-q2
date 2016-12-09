'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bodyParser = require('body-parser');
router.use(bodyParser.json());


//test route
router.get('/users', (req, res, next) => {
  knex('users')
  .orderBy('first_name')
  .then((users) => {
    res.send(users);
  }).catch((err) => {
    next(err);
  })
});

router.post('/notes', (req, res, next) => {
  var {content, name} = req.body;
  knex('notes')
  .insert({
    content,
    name
  }, '*')
  .then((note) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(note[0]);
  })
})

module.exports = router;

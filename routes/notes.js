'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bodyParser = require('body-parser');
router.use(bodyParser.json());


router.get('/notes/:id', function(req, res, next) {
  knex('notes')
  .where('id', req.params.id)
  .first()
  .then((note) => {
    if(!note){
      return next();
    }
    res.send(note);
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
  }).catch((err) => {
    next(err);
  })
});

router.patch('/notes/:id', (req, res, next) => {
  var {name, content} = req.body;
  knex('notes')
  .where('id', req.params.id)
  .update({
    content,
    name
  }, '*')
  .then((note) => {
    res.send(note);
  })
});

module.exports = router;

'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.get('/', function(req, res, next) {
  console.log('cool duded');
});

router.get('/:id', function(req, res, next) {
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

router.post('/', (req, res, next) => {
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
});

router.patch('/:id', (req, res, next) => {
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

router.delete('/:id', (req, res, next) => {
  knex('notes')
  .where('id', req.params.id)
  .del()
  .then((note) => {
    res.sendStatus(200);
  })
  .catch((err) => {
    next(err);
  })
});

module.exports = router;

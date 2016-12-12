'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bodyParser = require('body-parser');
const ev = require('express-validation');
const validations = require('../validations/notes');
const { camelizeKeys, decamelizeKeys } = require('humps');

router.use(bodyParser.json());

router.get('/:id', ev(validations.get), (req, res, next) => {
  knex('notes')
    .where('id', req.params.id)
    .first()
    .then((note) => {
      if(!note){
        return next();
      }
      res.send(camelizeKeys(note));
    }).catch((err) => {
      next(err);
    });
});

router.post('/', ev(validations.post), (req, res, next) => {
  let newNote = {};

  if (typeof(req.body.name) !== 'undefined') {
    newNote.name = req.body.name;
  }

  if (typeof(req.body.content) !== 'undefined') {
    newNote.content = req.body.content;
  }

  if (typeof(req.body.parentFolder) !== 'undefined') {
    newNote.parent_folder = req.body.parentFolder;
  }

  knex('notes')
    .insert(newNote, '*')
    .then((note) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.send(camelizeKeys(note[0]));
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;

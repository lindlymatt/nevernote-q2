'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bodyParser = require('body-parser');
const ev = require('express-validation');
const fs = require('fs');
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

router.get('/download/:id', ev(validations.get), (req, res, next) => {
  const user = req.body.userId;
  knex('notes')
    .innerJoin('user_notes', 'user_notes.note_id', 'notes.id')
    .where('notes.id', req.params.id)
    .andWhere('user_notes.user_id', user)
    .first()
    .then((note) => {
      if (!note) {
        return next();
      }
      res.set({'Content-Disposition': `attachment; filename=${note.name}.md`});
      res.send(note.content);
    })
    .catch((err) => {
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

  let newUserNote = {
    'user_id': req.body.userId,
  };

  if (typeof(req.body.readOnly) !== 'undefined') {
    newUserNote.read_only = req.body.readOnly;
  }

  knex('notes')
    .insert(newNote, '*')
    .then((note) => {
      newUserNote.note_id = note[0].id;
      knex('user_notes')
        .insert(newUserNote)
        .then((userNote) => {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.send(camelizeKeys(note[0]));
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
});

router.patch('/:id', ev(validations.patch), (req, res, next) => {
  let noteUpdates = {};
  if (typeof(req.body.name) !== 'undefined') {
    noteUpdates.name = req.body.name;
  }

  if (typeof(req.body.content) !== 'undefined') {
    noteUpdates.content = req.body.content;
  }

  if (typeof(req.body.parentFolder) !== 'undefined') {
    noteUpdates.parent_folder = req.body.parentFolder;
  }

  knex('notes')
    .update(noteUpdates, '*')
    .where('id', req.params.id)
    .then((updatedNote) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.send(camelizeKeys(updatedNote[0]));
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/:id', ev(validations.delete), (req, res, next) => {
  knex('notes')
    .where('id', req.body.id)
    .first()
    .then((note) => {
      if (!note) {
        return res.status(404).send('Not Found');
      }

      knex('notes')
        .del('*')
        .where('id', req.params.id)
        .then((deletedNote) => {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.send(camelizeKeys(deletedNote[0]));
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;

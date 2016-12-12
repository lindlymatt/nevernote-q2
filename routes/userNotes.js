'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const ev = require('express-validation');
const validations = require('../validations/userNotes');
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

router.post('/', ev(validations.post), (req, res, next) => {
  const user = req.body.userId;
  const {
    noteId,
    readOnly
  } = req.body;

  let userNote = {
    user_id: user,
    note_id: noteId
  };

  if (readOnly) {
    userNote.read_only = readOnly;
  }

  knex('notes')
    .where('notes.id', noteId)
    .first()
    .then((note) => {
      if (!note) {
        return res.status(404).send('Note Not Found');
      }

      knex('user_notes')
        .where('user_notes.user_id', user)
        .andWhere('user_notes.note_id', noteId)
        .then((existingUserNote) => {
          if (existingUserNote.length !== 0) {
            return res.status(418).send('User Already Has Access to This Note');
          }

          knex('user_notes')
            .insert(userNote, ['user_id', 'note_id', 'read_only'])
            .then((newUserNote) => {
              res.json(newUserNote[0]);
            })
            .catch((err) => {
              next(err);
            });
        })
        .catch((err) => {
          next(err);
        });
    });
});

router.patch('/:id', ev(validations.patch), (req, res, next) => {
  const user = req.body.userId;

  const { readOnly } = req.body;
  if (readOnly) {
    knex('user_notes')
      .where('user_notes.user_id', user)
      .andWhere('user_notes.note_id', req.params.id)
      .then((userNote) => {
        if (userNote.length === 0) {
          res.status(404).send('Not Found');
        }
        knex('user_notes')
          .where('user_notes.user_id', user)
          .andWhere('user_notes.note_id', req.params.id)
          .update({
            read_only: readOnly
          }, ['user_id', 'note_id', 'read_only'])
          .then((updatedUserNote) => {
            res.json(updatedUserNote);
          })
          .catch((err) => {
            next(err);
          });
      })
      .catch((err) => {
        next(err);
      });
  } else {
    return res.status(204).send('Need Something to Change');
  }
});

router.delete('/:id', ev(validations.delete), (req, res, next) => {
  const user = req.body.userId;
  knex('user_notes')
    .where('user_notes.user_id', user)
    .andWhere('user_notes.note_id', req.params.id)
    .del(['user_id', 'note_id', 'read_only'])
    .then((deletedNote) => {
      if (deletedNote.length === 0) {
        return res.status(404).send('Not Found');
      }
      res.json(deletedNote);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;

'use strict';

// This route needs to be to do:
  // GET: All of the folders in the database. GET/id: Gets a specific folder info.
  // POST: Adds a folder to the database.
  // PATCH: Updates a folder's information in the database.
  // DELETE: Delete's the folder from the database.

var express = require('express');
var router = express.Router();
var ev = require('express-validation');
var validations = require('../validations/folders');
var knex = require('../knex');
var bcrypt = require('bcrypt-as-promised');
const { camelizeKeys, decamelizeKeys } = require('humps');

// GET: All of the folders.
router.get('/', (req, res, next) => {
  // const uid = req.body.user_id;
  knex('folders')
    .where('user_id', uid)
    .then(results => {
      res.send(results);
    })
    .catch(err => {
      next(err);
    });
});

// GET w/ ID: Get a folder by it's ID.
router.get('/:id', ev(validations.get), (req, res, next) => {
  const id = req.params.id;

  // Gets the folder specifically by the ID.
  knex('folders')
    .where('folder.id', id)
    .andWhere('folder.user_id', 3) // <-- Should be req.body.userId.
    .first(result => {
      if(!result) {
        return res.status(404).send('Not Found.');
      }

      res.status(200).send(result);
    })
    .catch(err => {
      next(err);
    });
});

// POST: Creates a new folder.
router.post('/', ev(validations.post), (req, res, next) => {
  const { name, parent_folder, is_secure } = req.body;

  if(!parent_folder) {
    parent_folder === null;
  }

  // Change user_id to req.body.userId when token validation is 100%.
  let newFolder = { name, user_id: 3, parent_folder, is_secure };
  knex('folders')
    .insert(newFolder, ['name'])
    .then(result => {
      res.status(200).send('Successfully made a folder!');
    })
    .catch(err => {
      next(err);
    })
});

// PATCH w/ ID: Updates a user with the ID.
router.patch('/:id', ev(validations.patch), (req, res, next) => {
  const id = req.params.id;
  const { firstName, email, password } = req.body;

  let newUser = { firstName, email };
  bcrypt.hash(password, 10).then(result => {
    newUser.hashed_password = result;
    // Query and make sure the ID is fine.
    return knex('users')
      .max('id')
      .then(results => {
        if (!results || !id || id <= 0 || id > results) {
          return res.status(401).send('Unauthorized Access.');
        }
        // After determining if the ID exists and is valid; find it.
        return knex('users')
          .update(decamelizeKeys(newUser))
          .where('id', id)
          .then(updated => {
            delete newUser.hashed_password;
            res.status(200).send(camelizeKeys(newUser));
          });
      })
      .catch(err => {
        next(err);
      });
  })
});

// DELETE w/ ID: Deletes an individual user by ID.
router.delete('/:id', ev(validations.delete), (req, res, next) => {
  const id = req.params.id;

  knex('users')
    .max('id')
    .then(results => {
      if (!results || !id || id <= 0 || id > results) {
        return res.status(401).send('Unauthorized Access.');
      }
      // After determining if the ID exists delete it.
      return knex('users')
        .del([ 'first_name', 'email' ])
        .where('users.id', id)
        .then(deleted => {
          res.status(200).send(deleted[0]);
        });
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;

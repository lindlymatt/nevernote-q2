'use strict';

// This route needs to be to do:
  // GET: All of the users in the database. GET/id: Gets a specific user info.
  // POST: Adds a user to the database.
  // PATCH: Updates a user's information in the database.
  // DELETE: Delete's the user from the database.

var express = require('express');
var router = express.Router();
var ev = require('express-validation');
var validations = require('../validations/users');

// GET: All users.
router.get('/', (req, res, next) => {
  knex('users')
    .then(results => {
      res.status(200).send(results);
    })
    .catch(err => {
      next(err);
    })
});

// GET w/ ID: Gets a single user's information.
router.get('/:id', ev(validations), (req, res, next) => {
  const id = req.params.id;

  knex('users')
    .max('id')
    .then(results => {
      if (!id || id <= 0 || id > results) {
        return res.status(401).send('Unauthorized Access.');
      }
      // After determining if the ID exists and is valid; find it.
      knex('users')
        .where('users.id', id)
        .first()
        .then(result => {
          res.status(200).send(result);
        })
        .catch(err => {
          next(err);
        });
    })
    .catch(err => {
      next(err);
    })
});

// POST: Creates a new user.

module.exports = router;

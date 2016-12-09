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

// GET
router.get('/', ev(validations), (req, res, next) => {
  knex('users')
    .then(results => {
      res.send(results);
    })
    .catch(err => {
      next(err);
    })
});

// router.get('/:id', ev(validations), (req, res, next) => {
//   knex('users')
//     .
// });

module.exports = router;

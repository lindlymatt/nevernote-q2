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
var knex = require('../knex');
var bcrypt = require('bcrypt-as-promised');
const jwt = require('jsonwebtoken');
const { camelizeKeys, decamelizeKeys } = require('humps');

// POST: Creates a new user.
router.post('/', ev(validations.post), (req, res, next) => {
  const { firstName, email, password } = req.body;

  let newUser = { firstName, email };
  bcrypt.hash(password, 10).then((result) => {
    newUser.hashed_password = result;
    return knex('users')
      .insert(decamelizeKeys(newUser))
      .returning(['id', 'first_name', 'email', 'created_at', 'updated_at'])
      .then((result) => {
        delete newUser.hashed_password;
        let token = jwt.sign({
          userId: result[0].id,
          firstName: result[0].first_name
        }, process.env.JWT_SECRET);
        res.cookie('token', token, { httpOnly: true });
        res.cookie('userInfo', {name: result[0].first_name, email: result[0].email});
        return res.redirect('html/app.html');
      });
  })
  .catch((err) => {
    next(err);
  });
});

// Stops anyone from accessing anything unless logged in.
router.use((req, res, next) => {
  if(!req.cookies.token || req.cookies.token === undefined) {
    return res.status(401).send('Unauthorized.');
  }

  jwt.verify(req.cookies.token, process.env.JWT_SECRET, (e, d) => {
    if(e && d === undefined) {
      return res.status(401).send('Unauthorized.');
    }

    req.body.userId = d.userId;
    next();
  });
});

// GET: All users.
router.get('/', (req, res, next) => {
  knex('users')
    .select(['id', 'first_name', 'email', 'created_at', 'updated_at'])
    .then((results) => {
      res.status(200).send(camelizeKeys(results));
    })
    .catch((err) => {
      next(err);
    });
});

// GET w/ ID: Gets a single user's information.
router.get('/:id', ev(validations.get), (req, res, next) => {
  const id = req.params.id;

  knex('users')
    .max('id')
    .then(results => {
      if (!id || id <= 0 || id > results) {
        return res.status(401).send('Unauthorized Access.');
      }
      // After determining if the ID exists and is valid; find it.
      return knex('users')
        .where('users.id', id)
        .select(['id', 'first_name', 'email', 'created_at', 'updated_at'])
        .first()
        .then((result) => {
          if (!result) {
            return next();
          }
          res.status(200).send(camelizeKeys(result));
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
});

// PATCH w/ ID: Updates a user with the ID.
router.patch('/:id', ev(validations.patch), (req, res, next) => {
  const id = req.params.id;
  const { firstName, email, password } = req.body;

  let changes = {};
  if (firstName) {
    changes.first_name = firstName;
  }

  if (email) {
    changes.email = email;
  }

  if (password) {
    bcrypt.hash(password, 10)
      .then((result) => {
        changes.hashed_password = result;
        knex('users')
          .where('users.id', id)
          .then((user) => {
            if (!user) {
              return res.status(401).send('Unauthorized Access');
            }

            knex('users')
              .update(changes, ['id', 'first_name', 'email', 'created_at', 'updated_at'])
              .where('users.id', id)
              .then((updatedUser) => {
                delete changes.hashed_password;
                res.status(200).send(camelizeKeys(updatedUser[0]));
              })
              .catch((err) => {
                next(err);
              });
          })
          .catch((err) => {
            next(err);
          });
      })
      .catch((err) => {
        next(err);
      });
  } else {
    knex('users')
      .where('users.id', id)
      .then((user) => {
        if (!user) {
          return res.status(401).send('Unauthorized Access');
        }

        knex('users')
          .update(changes, ['id', 'first_name', 'email', 'created_at', 'updated_at'])
          .where('users.id', id)
          .then((updatedUser) => {
            delete changes.hashed_password;
            res.status(200).send(camelizeKeys(updatedUser[0]));
          })
          .catch((err) => {
            next(err);
          });
      })
      .catch((err) => {
        next(err);
      });
  }
});

// DELETE w/ ID: Deletes an individual user by ID.
router.delete('/:id', ev(validations.delete), (req, res, next) => {
  const id = req.params.id;

  knex('users')
    .max('id')
    .then((results) => {
      if (!results || !id || id <= 0 || id > results) {
        return res.status(401).send('Unauthorized Access.');
      }
      // After determining if the ID exists delete it.
      return knex('users')
        .del([ 'first_name', 'email' ])
        .where('users.id', id)
        .then((deleted) => {
          res.status(200).send(deleted[0]);
        });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;

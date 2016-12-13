'use strict';

// This route needs to be to do:
  // GET: Checks if the token exists, if it does; return true.
  // POST: Creates a token by utilizing user-authentication.
  // DELETE: Deletes the token from the user's storage.

var express = require('express');
var router = express.Router();
var ev = require('express-validation');
var validations = require('../validations/tokens');
var knex = require('../knex');
var bcrypt = require('bcrypt-as-promised');
var jwt = require('jsonwebtoken');
const { camelizeKeys, decamelizeKeys } = require('humps');

router.get('/token', (req, res, next) => {
  // Tests if a Cookie exists, if not; send a false.
  jwt.verify((req.cookies.token), process.env.JWT_SECRET, (err, decoded) => {
    if (err && decoded === undefined) {
      return res.status(401).send(false);
    }

    res.status(200).send(true);
  });
});

router.post('/token', ev(validations.post), (req, res, next) => {
  const {
    email,
    password
  } = req.body;
  knex('users')
    .where('email', email)
    .first()
    .then(data => {
      if (data) {
        bcrypt.compare(password, data.hashed_password)
          .then((match) => {
            if (match === true) {
              let token = jwt.sign({
                userId: data.id,
                firstName: data.first_name
              }, process.env.JWT_SECRET);
              res.cookie('token', token, { httpOnly: true });
              return res.redirect('html/app.html');
              // return res.status(200).send('Success!');
            }
            res.status(401).send('Unauthorized.');
        })
        .catch((err) => {
          res.status(401).send('Unauthorized');
        });
      } else {
        res.status(404).send('Not Found');
      }
    })
    .catch(err => {
      next(err);
    });
});

router.delete('/token', (req, res, next) => {
  res.clearCookie('token');
  res.send({
    redirectTo: '/index.html',
    msg: 'If this works ima cry'
  });
});

module.exports = router;

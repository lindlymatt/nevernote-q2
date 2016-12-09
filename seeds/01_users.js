'use strict';

var bcrypt = require('bcrypt-as-promised');
const passwords = {
  aidan: bcrypt.hash('baackadmin', 12),
  mattlin: bcrypt.hash('lindlyadmin', 12),
  mattpest: bcrypt.hash('pestridgeadmin', 12),
  malila: bcrypt.hash('clearwateradmin', 12),
  devin: bcrypt.hash('hurdadmin', 12)
};

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({
          id: 1,
          first_name: 'Aidan',
          email: 'baack.admin@gmail.com',
          hashed_password: passwords.aidan
        }),
        knex('users').insert({
          id: 2,
          first_name: 'Matt',
          email: 'pestridge.admin@gmail.com',
          hashed_password: passwords.mattpest
        }),
        knex('users').insert({
          id: 3,
          first_name: 'Matt',
          email: 'lindly.admin@gmail.com',
          hashed_password: passwords.mattlin
        }),
        knex('users').insert({
          id: 4,
          first_name: 'Malila',
          email: 'clearwater.admin@gmail.com',
          hashed_password: passwords.malila
        }),
        knex('users').insert({
          id: 5,
          first_name: 'Devin',
          email: 'hurd.admin@gmail.com',
          hashed_password: passwords.devin
        })
      ]);
    })
    .then(() => knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))"));
};

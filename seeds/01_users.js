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
          firstName: 'Aidan',
          email: 'baack.admin@gmail.com',
          hashedPassword: passwords.aidan
        }),
        knex('users').insert({
          id: 2,
          firstName: 'Matt',
          email: 'pestridge.admin@gmail.com',
          hashedPassword: passwords.mattpest
        }),
        knex('users').insert({
          id: 3,
          firstName: 'Matt',
          email: 'lindly.admin@gmail.com',
          hashedPassword: passwords.mattlin
        }),
        knex('users').insert({
          id: 4,
          firstName: 'Malila',
          email: 'clearwater.admin@gmail.com',
          hashedPassword: passwords.malila
        }),
        knex('users').insert({
          id: 5,
          firstName: 'Devin',
          email: 'hurd.admin@gmail.com',
          hashedPassword: passwords.devin
        })
      ]);
    })
    .then(() => knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))"));
};

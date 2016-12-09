'use strict';

var bcrypt = require('bcrypt-as-promised');

const passwords = {
  aidan: '$2a$12$0jFnXS8CE4GZ094HCwWEFuQXM0qkAohTcOb8oaONiWCnFFpGUcfcS', // baackadmin
  mattlin: '$2a$12$2tbWbnz0hDtMu8Eviz2SaO6vMRacnrvmv1paW9bWU.nnUPbZ.yfxa', // lindlyadmin
  mattpest: '$2a$12$/8d0tYxUh2YFJneBOS2BL.fsKB7fszRAjfiEHJzkN0GdEZFmtPH62', //pestridgeadmin
  malila: '$2a$12$K/RqkH/ejFrv9xmjctil8eK17J/FckPDVtuocXecPIfvZYPMjgCN.', //clearwateradmin
  devin: '$2a$12$Q7uZA3TvtvytBZgd4ciwZOpLuIWacpc2b9u6EgFA4igkHXeTMVY1C' //hurdadmin
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
